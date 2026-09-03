import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Bell, User, Home, BarChart3, Settings, Users, FileText, ChevronRight, Menu, X, TrendingUp, DollarSign, Activity, Zap, ArrowUp, ArrowDown, Star, Heart, MessageCircle } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-inter antialiased overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
                Nebula
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group">
              <Bell size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-800 rounded-full animate-pulse"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <nav className="p-4 space-y-1">
          {[
            { icon: Home, label: 'Dashboard', badge: null, active: true },
            { icon: BarChart3, label: 'Analytics', badge: 'New' },
            { icon: Users, label: 'Usuários', badge: null },
            { icon: FileText, label: 'Relatórios', badge: null },
            { icon: TrendingUp, label: 'Performance', badge: null },
            { icon: Settings, label: 'Configurações', badge: null },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                item.active
                  ? 'bg-gradient-to-r from-gray-700/30 to-black text-white border border-white/20 shadow-lg shadow-black/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className={item.active ? 'text-cyan-400' : ''} />
              {sidebarOpen && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-gray-700 to-black text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </a>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-gradient-to-br from-gray-800/40 to-black border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Star size={14} className="text-cyan-400 fill-cyan-400" />
              <span className="text-xs font-semibold">Upgrade Pro</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Desbloqueie recursos avançados</p>
            <button className="w-full text-xs font-medium py-1.5 rounded-lg bg-gradient-to-r from-cyan-700 to-black border border-cyan-500/30 hover:opacity-90 transition-opacity">
              Fazer Upgrade
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-1">Bem-vindo de volta! Aqui está seu resumo.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
                Exportar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-500/25">
                + Novo Projeto
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Receita Total', value: 'R$ 45.231', change: '+12.5%', up: true, icon: DollarSign, gradient: 'from-gray-800/30 to-black', iconColor: 'text-cyan-400' },
              { title: 'Usuários Ativos', value: '2.847', change: '+8.2%', up: true, icon: Users, gradient: 'from-gray-800/30 to-black', iconColor: 'text-cyan-400' },
              { title: 'Conversões', value: '12.5%', change: '-2.4%', up: false, icon: Activity, gradient: 'from-red-950/30 to-black', iconColor: 'text-red-500' },
              { title: 'Crescimento', value: '+24.5%', change: '+5.1%', up: true, icon: TrendingUp, gradient: 'from-gray-900/30 to-black', iconColor: 'text-cyan-400' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${stat.iconColor}`}>
                      <stat.icon size={18} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Performance Semanal</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Últimos 7 dias</p>
                </div>
                <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
                  {['7d', '30d', '90d'].map((period, i) => (
                    <button
                      key={period}
                      className={`px-3 py-1 text-xs rounded-md transition-all ${i === 0 ? 'bg-gray-800 border border-white/20 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-48">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full relative h-full flex items-end">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-gray-800 to-cyan-400 group-hover:from-gray-700 group-hover:to-cyan-300 transition-all cursor-pointer"
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="p-5 rounded-2xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10">
              <h3 className="font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                {[
                  { name: 'Ana Silva', action: 'criou um novo projeto', time: '2min', color: 'from-gray-700 to-black' },
                  { name: 'Carlos Lima', action: 'completou uma tarefa', time: '15min', color: 'from-stone-700 to-black' },
                  { name: 'Beatriz Costa', action: 'comentou no post', time: '1h', color: 'from-red-950 to-black' },
                  { name: 'Diego Santos', action: 'atualizou o design', time: '3h', color: 'from-gray-800 to-black' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 group cursor-pointer">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.color} flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.name}</span>{' '}
                        <span className="text-slate-400">{activity.action}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">há {activity.time}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-white transition-colors mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Projetos em Destaque</h2>
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Ver todos →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Design System v2.0', desc: 'Componentes modernos para apps', likes: 234, comments: 18, gradient: 'from-purple-500 via-pink-500 to-red-500' },
                { title: 'App Mobile Finance', desc: 'Gestão financeira pessoal', likes: 412, comments: 56, gradient: 'from-blue-500 via-cyan-500 to-emerald-500' },
                { title: 'E-commerce Platform', desc: 'Plataforma completa de vendas', likes: 189, comments: 24, gradient: 'from-orange-500 via-amber-500 to-yellow-500' },
              ].map((post, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-[#0d0d14]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden relative"
                >
                  <div className={`h-32 rounded-xl bg-gradient-to-br ${post.gradient} mb-4 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                  </div>
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{post.desc}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
                        <Heart size={14} /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                        <MessageCircle size={14} /> {post.comments}
                      </span>
                    </div>
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                      Ver mais →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-8"></div>
        </div>
      </main>
    </div>
  );
}
