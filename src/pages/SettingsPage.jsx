// SettingsPage.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Save } from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'João',
    email: 'pecuarista@rastro.com',
  });
  const [notifications, setNotifications] = useState({
    bpmAlerts: true,
    areaAlerts: true,
    emailNotifications: false,
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (name) => {
    setNotifications({ ...notifications, [name]: !notifications[name] });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (section) => {
    const sectionData = section === 'profile' ? profile : section === 'notifications' ? notifications : {};
    localStorage.setItem(`rastroGadoSettings_${section}`, JSON.stringify(sectionData));

    if (section === 'profile') {
      window.dispatchEvent(new Event('storage'));
    }

    if (section === 'password') {
      if (password.newPassword !== password.confirmNewPassword) {
        toast({
          title: 'Erro ao alterar senha',
          description: 'As novas senhas não coincidem.',
          variant: 'destructive',
        });
        return;
      }
      if (!password.currentPassword || !password.newPassword) {
        toast({
          title: 'Erro ao alterar senha',
          description: 'Preencha todos os campos de senha.',
          variant: 'destructive',
        });
        return;
      }
      setPassword({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    }

    toast({
      title: 'Configurações Salvas!',
      description: `Suas configurações de ${section === 'profile' ? 'perfil' : section === 'notifications' ? 'notificações' : 'senha'} foram atualizadas.`,
      variant: 'default',
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8 max-w-3xl mx-auto">
      <motion.h1 className="text-4xl font-bold text-brand-green" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
        Configurações
      </motion.h1>

      {/* Perfil do Usuário */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="bg-white shadow-xl rounded-lg card-glass">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-green flex items-center">
              <User className="mr-2 h-6 w-6 text-brand-orange" /> Perfil do Usuário
            </CardTitle>
            <CardDescription className="text-brand-green/80">Atualize suas informações pessoais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-brand-green font-medium">Nome</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange" />
            </div>
            <div>
              <Label htmlFor="email" className="text-brand-green font-medium">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange" />
            </div>
            <Button onClick={() => handleSaveChanges('profile')} className="btn-high-contrast w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Salvar Perfil
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferências de Notificação */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1}>
        <Card className="bg-white shadow-xl rounded-lg card-glass">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-green flex items-center">
              <Bell className="mr-2 h-6 w-6 text-brand-orange" /> Preferências de Notificação
            </CardTitle>
            <CardDescription className="text-brand-green/80">Escolha como você deseja ser notificado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NotificationItem id="bpmAlerts" label="Alertas de BPM fora do normal" checked={notifications.bpmAlerts} onCheckedChange={() => handleNotificationChange('bpmAlerts')} />
            <NotificationItem id="areaAlerts" label="Alertas de animal fora da área" checked={notifications.areaAlerts} onCheckedChange={() => handleNotificationChange('areaAlerts')} />
            <NotificationItem id="emailNotifications" label="Receber notificações por email" checked={notifications.emailNotifications} onCheckedChange={() => handleNotificationChange('emailNotifications')} />
            <Button onClick={() => handleSaveChanges('notifications')} className="btn-high-contrast w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Salvar Notificações
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alterar Senha */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2}>
        <Card className="bg-white shadow-xl rounded-lg card-glass">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-green flex items-center">
              <Lock className="mr-2 h-6 w-6 text-brand-orange" /> Alterar Senha
            </CardTitle>
            <CardDescription className="text-brand-green/80">Mantenha sua conta segura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-brand-green font-medium">Senha Atual</Label>
              <Input id="currentPassword" name="currentPassword" type="password" value={password.currentPassword} onChange={handlePasswordChange} className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-brand-green font-medium">Nova Senha</Label>
              <Input id="newPassword" name="newPassword" type="password" value={password.newPassword} onChange={handlePasswordChange} className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange" />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className="text-brand-green font-medium">Confirmar Nova Senha</Label>
              <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={password.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange" />
            </div>
            <Button onClick={() => handleSaveChanges('password')} className="btn-high-contrast w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Alterar Senha
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const NotificationItem = ({ id, label, checked, onCheckedChange }) => (
  <div className="flex items-center justify-between p-3 bg-brand-beige/30 rounded-md border border-brand-green/20">
    <Label htmlFor={id} className="text-brand-green font-medium cursor-pointer">{label}</Label>
    <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} className="data-[state=checked]:bg-brand-orange data-[state=unchecked]:bg-gray-300" />
  </div>
);

export default SettingsPage;
