
    import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Added import for Button
import { Youtube, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const tutorials = [
  { id: 'dQw4w9WgXcQ', title: 'Como Adicionar um Novo Animal', description: 'Aprenda passo a passo como cadastrar um novo animal no sistema RastroGado.' },
  { id: 'L_jWHffIx5E', title: 'Entendendo os Alertas de BPM', description: 'Saiba como interpretar e agir em relação aos alertas de batimentos por minuto.' },
  { id: '3JZ_D3ELwOQ', title: 'Configurando Áreas Seguras no Mapa', description: 'Delimite áreas seguras para seus animais e receba alertas caso saiam.' },
  { id: '6ZfuNTqbHE8', title: 'Gerando Relatórios de Desempenho', description: 'Descubra como extrair relatórios completos sobre seu rebanho.' },
];

const TutorialsPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h1 
        className="text-4xl font-bold text-brand-green flex items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Youtube className="mr-3 h-10 w-10 text-brand-orange" />
        Tutoriais em Vídeo
      </motion.h1>
      <motion.p
        className="text-lg text-brand-green/80"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Aprenda a usar todas as funcionalidades do RastroGado com nossos vídeos tutoriais.
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {tutorials.map((tutorial, index) => (
          <motion.custom
            key={tutorial.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden card-glass">
              <CardHeader className="p-0 relative">
                <div className="aspect-video bg-black flex items-center justify-center">
                  {/* YouTube Embed Placeholder */}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${tutorial.id}`}
                    title={tutorial.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-brand-green mb-1">{tutorial.title}</CardTitle>
                <CardDescription className="text-sm text-brand-green/70">{tutorial.description}</CardDescription>
                <Button variant="link" className="p-0 mt-2 text-brand-orange hover:underline">
                  <PlayCircle className="mr-1 h-4 w-4" /> Assistir Agora
                </Button>
              </CardContent>
            </Card>
          </motion.custom>
        ))}
      </div>
    </motion.div>
  );
};

export default TutorialsPage;
  