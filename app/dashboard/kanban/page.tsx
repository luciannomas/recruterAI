'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function KanbanPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      if (response.data.success) {
        setCandidates(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (candidateId: string, newStatus: string) => {
    try {
      const response = await axios.put(`/api/candidates/${candidateId}`, {
        status: newStatus
      });

      if (response.data.success) {
        // Update local state
        setCandidates(candidates.map(c =>
          c._id === candidateId ? { ...c, status: newStatus } : c
        ));
      }
    } catch (error) {
      console.error('Error updating candidate status:', error);
      alert('Error al actualizar el estado del candidato');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-lg">Cargando tablero...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tablero Kanban</h1>
          <p className="text-gray-600 mt-2">
            Arrastra y suelta candidatos para actualizar su estado
          </p>
        </div>
        <Button variant="outline" onClick={fetchCandidates}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
      </div>

      {/* Kanban Board */}
      {candidates.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No hay candidatos para mostrar
        </div>
      ) : (
        <KanbanBoard
          candidates={candidates}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

