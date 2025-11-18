'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getClassificationColor, getScoreColor, getStatusColor } from '@/lib/utils';
import { Search, Mail, Phone, FileText, ExternalLink } from 'lucide-react';

export default function CandidatesPage() {
  const [candidates, setcandidates] = useState<any[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = candidates.filter(c =>
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  }, [searchTerm, candidates]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      if (response.data.success) {
        setcandidates(response.data.data);
        setFilteredCandidates(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Cargando candidatos...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
        <p className="text-gray-600 mt-2">
          Gestiona y evalúa todos los candidatos
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Candidates List */}
      {filteredCandidates.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-gray-500">
              {searchTerm ? 'No se encontraron candidatos' : 'No hay candidatos registrados'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{candidate.fullName}</h3>
                        <p className="text-sm text-gray-600">
                          {candidate.vacancyId?.title || 'Vacante no disponible'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(candidate.aiScore)}`}>
                            {candidate.aiScore}
                          </div>
                          <div className="text-xs text-gray-500">Puntaje IA</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                      <Badge className={`${getClassificationColor(candidate.aiClassification)} text-white`}>
                        {candidate.aiClassification}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {candidate.phone}
                      </div>
                    </div>

                    {candidate.aiJustification && (
                      <p className="text-sm text-gray-600 italic">
                        {candidate.aiJustification}
                      </p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <a
                        href={candidate.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Ver CV
                        </Button>
                      </a>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
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

