
    import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-green to-green-700 text-brand-beige p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <AlertTriangle className="mx-auto h-24 w-24 text-brand-orange mb-6" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Página Não Encontrada</p>
        <p className="text-lg mb-8 max-w-md mx-auto">
          Oops! Parece que a página que você está procurando não existe ou foi movida.
        </p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button asChild className="btn-high-contrast text-lg px-8 py-4">
            <Link to="/">Voltar para o Início</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-sm text-brand-beige/70"
      >
        Se você acredita que isso é um erro, por favor, entre em contato com o suporte.
      </motion.p>
    </div>
  );
};

export default NotFoundPage;
  