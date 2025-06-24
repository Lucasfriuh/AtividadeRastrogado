
    import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login
    if (email === 'pecuarista@rastro.com' && password === 'gado123') {
      localStorage.setItem('rastroGadoUserToken', 'fake-jwt-token');
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta ao RastroGado.",
        variant: "default",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro de login",
        description: "Email ou senha inválidos. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-green to-green-700 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-brand-beige p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-brand-green"
          >
            RastroGado
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-brand-green/80 mt-2"
          >
            Acesse sua conta para gerenciar seu rebanho.
          </motion.p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Label htmlFor="email" className="text-brand-green font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
              className="mt-1 bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange"
            />
          </motion.div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Label htmlFor="password" className="text-brand-green font-semibold">Senha</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                className="bg-white border-brand-green/30 focus:border-brand-orange focus:ring-brand-orange"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3 text-brand-green/70 hover:text-brand-orange"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                <span className="sr-only">{showPassword ? 'Esconder' : 'Mostrar'} senha</span>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button type="submit" className="w-full btn-high-contrast">
              <LogIn className="mr-2 h-5 w-5" />
              Entrar
            </Button>
          </motion.div>
        </form>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-sm text-brand-green/80"
        >
          Não tem uma conta?{' '}
          <Link to="/register" className="font-semibold text-brand-orange hover:underline">
            Cadastre-se
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
  