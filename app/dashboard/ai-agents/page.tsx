'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Plus, 
  Search, 
  Star, 
  Users, 
  TrendingUp,
  Sparkles,
  Settings,
  Copy,
  Eye,
  Trash2,
  BarChart3
} from 'lucide-react';

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(a => a.category === filterCategory);
    }

    setFilteredAgents(filtered);
  }, [searchTerm, filterCategory, agents]);

  const fetchAgents = async () => {
    try {
      console.log('🔍 Fetching agents...');
      const response = await axios.get('/api/ai-agents');
      console.log('📥 Response:', response.data);
      if (response.data.success) {
        console.log('✅ Agents loaded:', response.data.data.length);
        setAgents(response.data.data);
        setFilteredAgents(response.data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      desarrollo: '🖥️',
      gerencia: '💼',
      diseño: '🎨',
      marketing: '📊',
      finanzas: '💰',
      rrhh: '🎓',
      operaciones: '🏗️',
      soporte: '🔧',
      otro: '📋'
    };
    return icons[category] || '📋';
  };

  const getCategoryColor = (category: string) => {
    const colors: any = {
      desarrollo: 'bg-blue-100 text-blue-700',
      gerencia: 'bg-purple-100 text-purple-700',
      diseño: 'bg-pink-100 text-pink-700',
      marketing: 'bg-green-100 text-green-700',
      finanzas: 'bg-yellow-100 text-yellow-700',
      rrhh: 'bg-indigo-100 text-indigo-700',
      operaciones: 'bg-orange-100 text-orange-700',
      soporte: 'bg-teal-100 text-teal-700',
      otro: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const templates = agents.filter(a => a.isTemplate);
  const customAgents = agents.filter(a => !a.isTemplate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="h-10 w-10 text-blue-600" />
            Agentes de Evaluación IA
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Configura cómo la IA evalúa a tus candidatos
          </p>
        </div>
        <Link href="/dashboard/ai-agents/new">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="mr-2 h-5 w-5" />
            Crear Agente Personalizado
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">{templates.length}</div>
                <div className="text-sm text-gray-600">Plantillas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">{customAgents.length}</div>
                <div className="text-sm text-gray-600">Personalizados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {agents.reduce((sum, a) => sum + (a.usageCount || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Usos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-900">
                  {agents.filter(a => a.active).length}
                </div>
                <div className="text-sm text-gray-600">Activos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar agentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="desarrollo">🖥️ Desarrollo</option>
              <option value="gerencia">💼 Gerencia</option>
              <option value="diseño">🎨 Diseño</option>
              <option value="marketing">📊 Marketing</option>
              <option value="finanzas">💰 Finanzas</option>
              <option value="rrhh">🎓 Recursos Humanos</option>
              <option value="operaciones">🏗️ Operaciones</option>
              <option value="soporte">🔧 Soporte</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Plantillas del Sistema */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Plantillas del Sistema</h2>
          <Badge className="bg-blue-100 text-blue-700">Pre-configuradas</Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.filter(a => a.isTemplate).map((agent) => (
            <Card key={agent.name} className="hover:shadow-lg transition-all border-2 hover:border-blue-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{getCategoryIcon(agent.category)}</div>
                  <Badge className={getCategoryColor(agent.category)}>
                    {agent.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <CardDescription>
                  Agente especializado en {agent.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <span>Usado {agent.usageCount || 0}x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>Template</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experiencia:</span>
                    <span className="font-semibold">{agent.criteria.experience.weight} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skills Técnicas:</span>
                    <span className="font-semibold">{agent.criteria.technicalSkills.weight} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Educación:</span>
                    <span className="font-semibold">{agent.criteria.education.weight} pts</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Copy className="mr-2 h-4 w-4" />
                    Clonar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Agentes Personalizados */}
      {customAgents.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Mis Agentes Personalizados</h2>
            <Badge className="bg-purple-100 text-purple-700">Custom</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.filter(a => !a.isTemplate).map((agent) => (
              <Card key={agent._id} className="hover:shadow-lg transition-all border-2 hover:border-purple-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl">{getCategoryIcon(agent.category)}</div>
                    <Badge className={getCategoryColor(agent.category)}>
                      {agent.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <CardDescription>
                    Agente personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                      <span>Usado {agent.usageCount || 0}x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-purple-500" />
                      <span>Custom</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron agentes
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory !== 'all' 
                ? 'Intenta con otros filtros de búsqueda'
                : 'Crea tu primer agente personalizado'}
            </p>
            <Link href="/dashboard/ai-agents/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Agente
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

