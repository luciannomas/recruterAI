'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/lib/utils';

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get('/api/vacancies');
      if (response.data.success) {
        setVacancies(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta vacante?')) return;

    try {
      await axios.delete(`/api/vacancies/${id}`);
      setVacancies(vacancies.filter(v => v._id !== id));
    } catch (error) {
      alert('Error al eliminar la vacante');
    }
  };

  if (loading) {
    return <div className="animate-pulse">Cargando vacantes...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vacantes</h1>
          <p className="text-gray-600 mt-2">
            Gestiona todas las posiciones disponibles
          </p>
        </div>
        <Link href="/dashboard/vacancies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Vacante
          </Button>
        </Link>
      </div>

      {/* Vacancies List */}
      {vacancies.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-gray-500 mb-4">No hay vacantes creadas</p>
            <Link href="/dashboard/vacancies/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primera Vacante
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vacancies.map((vacancy) => (
            <Card key={vacancy._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {vacancy.title}
                  </CardTitle>
                  <Badge className={getStatusColor(vacancy.status)}>
                    {vacancy.status === 'draft' && 'Borrador'}
                    {vacancy.status === 'published' && 'Publicada'}
                    {vacancy.status === 'closed' && 'Cerrada'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {vacancy.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {vacancy.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {formatCurrency(vacancy.salary.min)} - {formatCurrency(vacancy.salary.max)}
                  </div>
                  
                  {vacancy.requiredSkills && vacancy.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {vacancy.requiredSkills.slice(0, 3).map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {vacancy.requiredSkills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vacancy.requiredSkills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/apply/${vacancy._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/dashboard/vacancies/${vacancy._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(vacancy._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

