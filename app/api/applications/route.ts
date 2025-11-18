import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isMongoDBAvailable } from '@/lib/mongodb';
import Candidate from '@/models/Candidate';
import Vacancy from '@/models/Vacancy';
import AIAgent from '@/models/AIAgent';
import { analyzeCandidateCV } from '@/lib/openai';
import { sendApplicationConfirmation } from '@/lib/email';
import { sendApplicationConfirmationWhatsApp } from '@/lib/whatsapp';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { mockVacancies, mockCandidates, usingMockData } from '@/lib/mock-data';
import { aiAgentTemplates } from '@/lib/ai-agent-templates';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const vacancyId = formData.get('vacancyId') as string;
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const cvFile = formData.get('cv') as File;
    
    if (!vacancyId || !fullName || !email || !phone || !cvFile) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Obtener información de la vacante
    let vacancy;
    if (usingMockData() || !isMongoDBAvailable()) {
      vacancy = mockVacancies.find(v => v._id === vacancyId);
    } else {
      vacancy = await Vacancy.findById(vacancyId);
    }
    
    if (!vacancy) {
      return NextResponse.json(
        { success: false, error: 'Vacante no encontrada' },
        { status: 404 }
      );
    }
    
    if (vacancy.status !== 'published') {
      return NextResponse.json(
        { success: false, error: 'Esta vacante no está disponible' },
        { status: 400 }
      );
    }
    
    // Crear directorio de uploads si no existe
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cvs');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists
    }
    
    // Guardar CV
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    const cvUrl = `/uploads/cvs/${fileName}`;
    
    // Extraer texto del CV (simplificado - en producción usar pdf-parse)
    const cvText = `CV de ${fullName}`;
    
      // Obtener el agente de IA asociado a la vacante
      let aiAgent = null;
      const vacancyWithAgent = vacancy as any;
      if (vacancyWithAgent.aiAgentId) {
        if (usingMockData() || !isMongoDBAvailable()) {
          // Buscar en plantillas mock
          aiAgent = aiAgentTemplates.find(a => a.name === vacancyWithAgent.aiAgentId);
        } else {
          try {
            aiAgent = await AIAgent.findById(vacancyWithAgent.aiAgentId);
          } catch (error) {
            console.log('⚠️  No se pudo cargar el agente de IA');
          }
        }
      }
    
    // Analizar CV con IA usando el agente específico
    let aiAnalysis = {
      score: 50,
      classification: 'potential' as 'ideal' | 'potential' | 'no-fit',
      summary: 'Análisis pendiente',
      strengths: [] as string[],
      concerns: [] as string[]
    };
    
    try {
      aiAnalysis = await analyzeCandidateCV(
        cvText,
        vacancy.optimizedDescription || vacancy.description,
        vacancy.requiredSkills || [],
        aiAgent
      );
    } catch (error) {
      console.error('⚠️  Error analizando CV (requiere OPENAI_API_KEY):', error);
    }
    
      // Crear candidato
      let candidate;
      if (usingMockData() || !isMongoDBAvailable()) {
        // En modo mock, simular creación
        candidate = {
          _id: `candidate-${Date.now()}`,
          vacancyId,
          fullName,
          email,
          phone,
          cvPath: cvUrl,
          status: 'applied',
          aiAnalysis: {
            score: aiAnalysis.score,
            classification: aiAnalysis.classification,
            summary: aiAnalysis.summary,
            strengths: aiAnalysis.strengths,
            concerns: aiAnalysis.concerns
          },
          appliedAt: new Date().toISOString()
        };
        mockCandidates.push(candidate);
    } else {
      candidate = await Candidate.create({
        vacancyId,
        fullName,
        email,
        phone,
        cvUrl,
        cvText,
        aiScore: aiAnalysis.score,
        aiClassification: aiAnalysis.classification,
        aiJustification: aiAnalysis.summary,
        status: 'applied'
      });
    }
    
    // Enviar confirmación por email
    try {
      await sendApplicationConfirmation(fullName, email, vacancy.title);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
    
    // Enviar confirmación por WhatsApp (opcional)
    try {
      await sendApplicationConfirmationWhatsApp(fullName, phone, vacancy.title);
    } catch (error) {
      console.error('Error enviando WhatsApp:', error);
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: candidate,
        message: '¡Aplicación enviada con éxito! Te contactaremos pronto.'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error en aplicación:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

