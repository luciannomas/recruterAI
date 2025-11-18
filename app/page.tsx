import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  Bot, 
  TrendingUp, 
  Sparkles, 
  Target,
  Clock,
  Mail,
  MessageSquare,
  FileText,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RecruiterAI</span>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard/vacancies">
              <Button>Comenzar Gratis</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="mx-auto bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Sparkles className="w-3 h-3 mr-1" />
              Potenciado por IA
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
              Reclutamiento
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Inteligente</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Encuentra al mejor talento más rápido con análisis automático de CVs, 
              gestión Kanban y notificaciones inteligentes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Users className="mr-2 h-5 w-5" />
                  Acceder al Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            <Link href="/vacancies">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                <Briefcase className="mr-2 h-5 w-5" />
                Ver Vacantes Disponibles
              </Button>
            </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-gray-900">10x</div>
                <div className="text-sm text-gray-600">Más Rápido</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Precisión IA</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Automatizado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
              Características
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para reclutar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa con herramientas potenciadas por IA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Análisis con IA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  GPT-4 evalúa automáticamente cada CV, asigna puntajes del 1-100 y 
                  clasifica candidatos como ideales, potenciales o no aptos.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Evaluación instantánea
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Gestión de Vacantes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Crea y publica vacantes en minutos. La IA optimiza automáticamente 
                  las descripciones para atraer al mejor talento.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">
                  <Sparkles className="w-4 h-4" />
                  Optimización automática
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Kanban Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tablero drag & drop para gestionar candidatos. Muévelos entre 
                  etapas: aplicado, screening, entrevista, oferta y más.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-purple-600 font-medium">
                  <Users className="w-4 h-4" />
                  Gestión intuitiva
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Notificaciones Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Envía confirmaciones, invitaciones a entrevistas y cartas de 
                  oferta automáticamente por email.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 font-medium">
                  <Zap className="w-4 h-4" />
                  Totalmente automático
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-pink-200">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">WhatsApp Integrado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comunícate con candidatos por WhatsApp. Confirmaciones y 
                  actualizaciones instantáneas vía Twilio.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-pink-600 font-medium">
                  <MessageSquare className="w-4 h-4" />
                  Comunicación directa
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Cartas de Oferta IA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Genera cartas de oferta profesionales en segundos con GPT-4. 
                  Personalizadas y listas para enviar.
                </CardDescription>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-medium">
                  <FileText className="w-4 h-4" />
                  Generación instantánea
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
              Proceso Simple
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recluta en 4 pasos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde crear la vacante hasta contratar, todo simplificado
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Crea Vacante</h3>
              <p className="text-gray-600">Publica tu posición con descripción optimizada por IA</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recibe CVs</h3>
              <p className="text-gray-600">Los candidatos aplican y la IA analiza automáticamente</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Gestiona</h3>
              <p className="text-gray-600">Mueve candidatos en el Kanban según avancen</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contrata</h3>
              <p className="text-gray-600">Genera oferta con IA y envía automáticamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-gray-600 font-medium">Tiempo ahorrado</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-gray-600 font-medium">Precisión IA</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3x
              </div>
              <div className="text-gray-600 font-medium">Más candidatos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:75px_75px]" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <Badge className="bg-white/20 text-white hover:bg-white/20 border-white/30">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Comienza Hoy
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              ¿Listo para reclutar con IA?
            </h2>
            
            <p className="text-xl text-blue-100">
              Únete a las empresas que están transformando su proceso de reclutamiento
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/dashboard/vacancies/new">
                <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Crear Primera Vacante
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Ver Dashboard
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Configuración en 5 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RecruiterAI</span>
              </div>
              <p className="text-sm">
                Automatiza tu reclutamiento con inteligencia artificial
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/vacancies" className="hover:text-white">Ver Vacantes</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/dashboard/kanban" className="hover:text-white">Kanban</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentación</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Soporte</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 RecruiterAI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

