'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus,
  ArrowRight,
  Sparkles,
  Target,
  Mail,
  FileText,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalVacancies: 0,
    activeVacancies: 0,
    totalCandidates: 0,
    idealCandidates: 0,
    potentialCandidates: 0,
    inInterview: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentVacancies, setRecentVacancies] = useState<any[]>([]);
  const [topCandidates, setTopCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [vacanciesRes, candidatesRes] = await Promise.all([
        axios.get('/api/vacancies'),
        axios.get('/api/candidates'),
      ]);

      if (vacanciesRes.data.success && candidatesRes.data.success) {
        const vacancies = vacanciesRes.data.data;
        const candidates = candidatesRes.data.data;

        setStats({
          totalVacancies: vacancies.length,
          activeVacancies: vacancies.filter((v: any) => v.status === 'published').length,
          totalCandidates: candidates.length,
          idealCandidates: candidates.filter((c: any) => c.aiClassification === 'ideal').length,
          potentialCandidates: candidates.filter((c: any) => c.aiClassification === 'potencial').length,
          inInterview: candidates.filter((c: any) => c.status === 'interview' || c.status === 'evaluation').length,
        });

        // Últimas 3 vacantes
        setRecentVacancies(vacancies.slice(0, 3));
        
        // Top 5 candidatos por score
        setTopCandidates(
          candidates
            .sort((a: any, b: any) => b.aiScore - a.aiScore)
            .slice(0, 5)
        );
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Bienvenido a tu panel de reclutamiento inteligente
          </p>
        </div>
        <Link href="/dashboard/vacancies/new">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="mr-2 h-5 w-5" />
            Nueva Vacante
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Vacantes
            </CardTitle>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-900">{stats.totalVacancies}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <Activity className="w-3 h-3 mr-1" />
                {stats.activeVacancies} activas
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Total Candidatos
            </CardTitle>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-900">{stats.totalCandidates}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                <Calendar className="w-3 h-3 mr-1" />
                {stats.inInterview} en proceso
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Candidatos Ideales
            </CardTitle>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-900">{stats.idealCandidates}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                <Sparkles className="w-3 h-3 mr-1" />
                Por IA
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="border-2 border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Potenciales
            </CardTitle>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-900">{stats.potentialCandidates}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                En evaluación
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Acciones Rápidas - 2 columnas */}
        <Card className="lg:col-span-2 border-2 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Acciones Rápidas</CardTitle>
                <CardDescription className="text-base mt-1">
                  Accede a las funciones principales del sistema
                </CardDescription>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Link href="/dashboard/vacancies/new">
              <div className="group p-6 border-2 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Crear Vacante</h3>
                    <p className="text-sm text-gray-600">
                      Publica una nueva posición con IA
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            <Link href="/dashboard/kanban">
              <div className="group p-6 border-2 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Tablero Kanban</h3>
                    <p className="text-sm text-gray-600">
                      Gestiona candidatos visualmente
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            <Link href="/dashboard/candidates">
              <div className="group p-6 border-2 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Ver Candidatos</h3>
                    <p className="text-sm text-gray-600">
                      Revisa todos los postulantes
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            <Link href="/dashboard/vacancies">
              <div className="group p-6 border-2 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Gestionar Vacantes</h3>
                    <p className="text-sm text-gray-600">
                      Administra tus posiciones
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Top Candidatos - 1 columna */}
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-xl">Top Candidatos</CardTitle>
            <CardDescription>
              Mejor calificados por IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCandidates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No hay candidatos aún</p>
              </div>
            ) : (
              topCandidates.map((candidate, index) => (
                <div key={candidate._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{candidate.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{candidate.vacancyId?.title}</p>
                  </div>
                  <Badge className={`${
                    candidate.aiScore >= 90 ? 'bg-green-100 text-green-700' :
                    candidate.aiScore >= 80 ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {candidate.aiScore}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Banner */}
      <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Potenciado por IA</CardTitle>
              <CardDescription className="text-base">
                Características inteligentes para reclutar mejor
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Análisis de CVs</h4>
                <p className="text-xs text-gray-600">Evaluación automática con GPT-4</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Optimización</h4>
                <p className="text-xs text-gray-600">Descripciones mejoradas por IA</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Notificaciones</h4>
                <p className="text-xs text-gray-600">Email y WhatsApp automáticos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Gestión Visual</h4>
                <p className="text-xs text-gray-600">Tablero Kanban drag & drop</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

