'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Kanban, 
  Settings,
  Bell,
  Sparkles,
  LogOut,
  Menu,
  X,
  Bot
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Vacantes', href: '/dashboard/vacancies', icon: Briefcase, badge: null },
  { name: 'Candidatos', href: '/dashboard/candidates', icon: Users, badge: null },
  { name: 'Kanban', href: '/dashboard/kanban', icon: Kanban, badge: null },
  { name: 'Agentes IA', href: '/dashboard/ai-agents', icon: Bot, badge: 'Nuevo' },
  { name: 'Notificaciones', href: '/dashboard/notifications', icon: Bell, badge: null },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings, badge: null },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  RecruiterAI
                </h1>
                <p className="text-xs text-blue-100">Panel Admin</p>
              </div>
            </div>
          </div>

          {/* AI Badge */}
          <div className="mx-4 mt-4 mb-2">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-900">Potenciado por IA</span>
              </div>
              <p className="text-xs text-gray-600">
                Análisis automático con GPT-4
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Menú Principal
            </p>
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname?.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className={cn(
                      'mr-3 h-5 w-5 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                    )} />
                    {item.name}
                  </div>
                  {item.badge && !isActive && (
                    <Badge className="bg-green-100 text-green-700 text-xs hover:bg-green-100">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="px-4 pb-4 space-y-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Acciones Rápidas
            </p>
            <Link href="/dashboard/vacancies/new" onClick={() => setSidebarOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                <Briefcase className="mr-2 h-4 w-4" />
                Nueva Vacante
              </Button>
            </Link>
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Button variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Ir al Inicio
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@recruiter.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <p className="text-sm text-gray-600">
                  Bienvenido de nuevo 👋
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                <Sparkles className="w-3 h-3 mr-1" />
                IA Activa
              </Badge>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

