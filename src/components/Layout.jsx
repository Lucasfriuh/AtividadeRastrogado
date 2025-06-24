// Layout.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  Menu, X, Home, List, MapPin, Youtube, Settings,
  LogOut, Bell, UserCircle, ChevronsLeft, ChevronsRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getAll } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Animais', href: '/animals', icon: List },
  { name: 'Mapa', href: '/map', icon: MapPin },
  { name: 'Tutoriais', href: '/tutorials', icon: Youtube },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Usuário',
    email: 'email@exemplo.com',
    location: 'Localização não definida',
  });
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const loadUserProfile = () => {
      try {
        const stored = localStorage.getItem('rastroGadoSettings_profile');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserProfile({
            name: parsed.name || 'Usuário',
            email: parsed.email || 'email@exemplo.com',
            location: localStorage.getItem('rastroGadoUserLocation') || 'Localização não definida',
          });
        }
      } catch {}
    };

    loadUserProfile();
    window.addEventListener('storage', loadUserProfile);
    return () => window.removeEventListener('storage', loadUserProfile);
  }, []);

  const totalCows = getAll().length;

  useEffect(() => {
    const animais = getAll();
    const alertas = animais
      .filter((a) => a.status === 'alerta_bpm' || a.status === 'alerta_area')
      .map((a) => ({
        id: a.id,
        message:
          a.status === 'alerta_bpm'
            ? `Animal ${a.name} com BPM alto (${a.bpm} bpm)`
            : `Animal ${a.name} fora da área delimitada`,
        type: 'alert',
      }));
    setNotifications(alertas);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rastroGadoUserToken');
    toast({
      title: 'Logout realizado!',
      description: 'Você foi desconectado com sucesso.',
      variant: 'default',
    });
    setProfileSheetOpen(false);
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h1 className={`text-3xl font-bold text-brand-beige ${sidebarOpen || isMobile ? '' : 'hidden'}`}>
            RastroGado
          </h1>
        </motion.div>
        {isMobile && (
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-brand-beige hover:bg-brand-orange">
              <X size={24} />
            </Button>
          </SheetClose>
        )}
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
          >
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-3 text-base font-medium rounded-md transition-colors duration-150 ease-in-out
                ${isActive ? 'bg-brand-orange text-white shadow-lg' : 'text-brand-beige hover:bg-brand-green-dark hover:text-white'}
                ${sidebarOpen || isMobile ? 'justify-start' : 'justify-center'}`
              }
              onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
            >
              <item.icon className={`mr-3 h-6 w-6 ${sidebarOpen || isMobile ? '' : 'mx-auto'}`} aria-hidden="true" />
              {(sidebarOpen || isMobile) && item.name}
            </NavLink>
          </motion.div>
        ))}
      </nav>
      <motion.div className="p-4 mt-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`w-full flex items-center text-brand-beige hover:bg-brand-orange hover:text-white
          ${(sidebarOpen || isMobile) ? 'justify-start' : 'justify-center'}`}
        >
          <LogOut className={`mr-3 h-6 w-6 ${(sidebarOpen || isMobile) ? '' : 'mx-auto'}`} />
          {(sidebarOpen || isMobile) && 'Sair'}
        </Button>
      </motion.div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-brand-beige">
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? '280px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex md:flex-shrink-0"
      >
        <div className="flex flex-col w-full bg-gradient-to-b from-brand-green to-green-700 shadow-2xl relative">
          <SidebarContent />
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-brand-orange hover:bg-orange-600 text-white rounded-full shadow-lg z-20 p-2 h-8 w-8"
          >
            {sidebarOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-md md:justify-end">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-brand-green" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-gradient-to-b from-brand-green to-green-700 p-0 border-none shadow-2xl">
              <SidebarContent isMobile={true} />
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-4">
            {<div className="flex items-center space-x-4">
  {/* Notificações */}
  <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="relative text-brand-green hover:bg-brand-beige rounded-full"
        aria-label="Notificações"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </Button>
    </SheetTrigger>

    <SheetContent side="right" className="w-72 bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notificações</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" aria-label="Fechar notificações">
            <X />
          </Button>
        </SheetClose>
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma notificação ativa.</p>
      ) : (
        <ul className="space-y-3 max-h-[400px] overflow-y-auto">
          {notifications.map((n) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3 rounded border border-red-300 bg-red-50 text-red-700"
            >
              {n.message}
            </motion.li>
          ))}
        </ul>
      )}
    </SheetContent>
  </Sheet>

  {/* Perfil */}
  <Sheet open={profileSheetOpen} onOpenChange={setProfileSheetOpen}>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="text-brand-green hover:bg-brand-beige rounded-full">
        <UserCircle className="h-6 w-6" />
        <span className="sr-only">Perfil</span>
      </Button>
    </SheetTrigger>

    <SheetContent side="right" className="w-64 bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Perfil</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon">
            <X />
          </Button>
        </SheetClose>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm"><strong>Nome:</strong> {userProfile.name}</p>
        <p className="text-sm"><strong>Email:</strong> {userProfile.email}</p>
        <p className="text-sm"><strong>Localização:</strong> {userProfile.location}</p>
        <p className="text-sm"><strong>Total de Vacas:</strong> {totalCows}</p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/settings');
            setProfileSheetOpen(false);
          }}
          className="w-full"
        >
          Editar Perfil
        </Button>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</div>
}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-brand-beige">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;