'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
  Zap,
  Filter,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function PublicVacanciesPage() {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVacancies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = vacancies.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVacancies(filtered);
    } else {
      setFilteredVacancies(vacancies);
    }
  }, [searchTerm, vacancies]);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get('/api/vacancies?status=published');
      if (response.data.success) {
        setVacancies(response.data.data);
        setFilteredVacancies(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">RecruiterAI</span>
                <p className="text-xs text-gray-500">Encuentra tu carrera ideal</p>
              </div>
            </Link>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="ghost">Inicio</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">Panel Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:75px_75px]" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-white/20 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              {filteredVacancies.length} Oportunidades Disponibles
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Encuentra tu
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Trabajo Soñado
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Explora oportunidades únicas y postúlate en minutos con análisis de IA
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto pt-6">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar por puesto, departamento, ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-5 h-16 text-lg bg-white shadow-2xl border-0 focus:ring-2 focus:ring-yellow-400"
                />
                <Button 
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 border-blue-100 bg-white shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {filteredVacancies.length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Vacantes Activas</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 bg-white shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                {new Set(filteredVacancies.map(v => v.department)).size}
              </div>
              <p className="text-sm text-gray-600 font-medium">Departamentos</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 bg-white shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-1">
                24h
              </div>
              <p className="text-sm text-gray-600 font-medium">Respuesta Promedio</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100 bg-white shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-1">
                95%
              </div>
              <p className="text-sm text-gray-600 font-medium">Tasa de Match IA</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {searchTerm ? 'Resultados de Búsqueda' : 'Todas las Oportunidades'}
            </h2>
            <p className="text-gray-600">
              {filteredVacancies.length} {filteredVacancies.length === 1 ? 'vacante' : 'vacantes'} {searchTerm && `para "${searchTerm}"`}
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Vacancies Grid */}
        {filteredVacancies.length === 0 ? (
          <Card className="max-w-2xl mx-auto border-2">
            <CardContent className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No se encontraron vacantes
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Vuelve pronto para ver nuevas oportunidades'}
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  Limpiar Búsqueda
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <Card 
                key={vacancy._id} 
                className="group border-2 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Activa
                    </Badge>
                    <Badge variant="outline" className="capitalize border-2">
                      {vacancy.employmentType === 'full-time' && 'Tiempo Completo'}
                      {vacancy.employmentType === 'part-time' && 'Medio Tiempo'}
                      {vacancy.employmentType === 'contract' && 'Contrato'}
                      {vacancy.employmentType === 'internship' && 'Prácticas'}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {vacancy.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <CardDescription className="text-base font-medium">
                      {vacancy.department}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium">{vacancy.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">
                        {formatCurrency(vacancy.salary.min)} - {formatCurrency(vacancy.salary.max)}
                      </span>
                    </div>
                    {vacancy.experienceYears > 0 && (
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{vacancy.experienceYears} años de experiencia</span>
                      </div>
                    )}
                  </div>

                  {vacancy.requiredSkills && vacancy.requiredSkills.length > 0 && (
                    <div className="pt-3 border-t">
                      <div className="flex flex-wrap gap-2 min-h-[28px]">
                        {vacancy.requiredSkills.slice(0, 3).map((skill: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs font-medium">
                            {skill}
                          </Badge>
                        ))}
                        {vacancy.requiredSkills.length > 3 && (
                          <Badge variant="secondary" className="text-xs font-medium">
                            +{vacancy.requiredSkills.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-auto">
                    <Link href={`/apply/${vacancy._id}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg group-hover:shadow-xl transition-all h-12 text-base font-semibold">
                        Postularme Ahora
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-blue-100">
              Déjanos tu CV y te notificaremos cuando haya nuevas oportunidades que coincidan con tu perfil
            </p>
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
              Subir mi CV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RecruiterAI</span>
              </div>
              <p className="text-sm">
                Encuentra tu próximo trabajo con inteligencia artificial
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Para Candidatos</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/vacancies" className="hover:text-white">Ver Vacantes</Link></li>
                <li><a href="#" className="hover:text-white">Subir CV</a></li>
                <li><a href="#" className="hover:text-white">Mis Aplicaciones</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Para Empresas</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white">Publicar Vacante</a></li>
                <li><a href="#" className="hover:text-white">Ver Candidatos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
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

