import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, BarChart2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAnimals: 0,
    activeAlerts: 0,
    animalsOk: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const animais = JSON.parse(localStorage.getItem('rastroGadoAnimals')) || [];

      const totalAnimals = animais.length;
      const activeAlerts = animais.filter(a => a.status === 'alerta_bpm' || a.status === 'alerta_area').length;
      const animalsOk = animais.filter(a => a.status === 'normal').length;

      // Você pode personalizar as atividades recentes aqui, ou puxar de outro lugar
      const recentActivities = [
        ...animais
          .filter(a => a.status === 'alerta_bpm' || a.status === 'alerta_area')
          .slice(-3)
          .map((a, i) => ({
            id: `alert-${i}`,
            type: 'alert',
            message: `Animal ${a.name} com status ${a.status.replace('_', ' ')}`,
            time: 'agora',
          })),
        { id: 'info-1', type: 'info', message: 'Novo animal adicionado', time: '1 hora atrás' },
      ];

      setDashboardData({ totalAnimals, activeAlerts, animalsOk, recentActivities });
      setLoading(false);
    };

    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-4xl font-bold text-brand-green mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-l-4 border-brand-green">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-green">Total de Animais</CardTitle>
              <Users className="h-5 w-5 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-green">{dashboardData.totalAnimals}</div>
              <p className="text-xs text-gray-500 mt-1">Animais monitorados</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-l-4 border-brand-orange">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-orange">Alertas Ativos</CardTitle>
              <AlertCircle className="h-5 w-5 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-orange">{dashboardData.activeAlerts}</div>
              <p className="text-xs text-gray-500 mt-1">Requerem atenção imediata</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-l-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Animais OK</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{dashboardData.animalsOk}</div>
              <p className="text-xs text-gray-500 mt-1">Status normal</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-green">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {dashboardData.recentActivities.map((activity, index) => (
                <motion.li 
                  key={activity.id} 
                  className="flex items-start space-x-3 pb-2 border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                >
                  {activity.type === 'alert' ? (
                    <AlertCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-1" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${activity.type === 'alert' ? 'text-brand-orange' : 'text-brand-green'}`}>
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
