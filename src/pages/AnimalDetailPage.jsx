import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getById, create, update } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function AnimalDetailPage() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Campos usados no formulário
  const campos = ['name','status','bpm','sex','age','photoUrl','lat','lng'];

  const [dados, setDados] = useState({
    name: '',
    status: 'normal',
    bpm: '',
    sex: '',
    age: '',
    photoUrl: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    if (animalId !== 'novo') {
      const animal = getById(animalId);
      if (animal) {
        // Garantir que todos os campos existam, evitando undefined
        const novoEstado = { ...dados };
        campos.forEach(c => {
          novoEstado[c] = animal[c] ?? '';
        });
        setDados(novoEstado);
      } else {
        navigate('/animals');
      }
    }
  }, [animalId]);

  function handleChange(e) {
    const { name, value } = e.target;
    // Para bpm, garantir que seja número ou vazio
    if (name === 'bpm') {
      if (value === '' || /^\d*$/.test(value)) {
        setDados(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setDados(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validar campos essenciais
    if (!dados.name.trim()) {
      toast({ title: 'Erro', description: 'Nome é obrigatório.', variant: 'destructive' });
      return;
    }

    // Converter bpm para número (0 se vazio)
    const bpmNumber = dados.bpm === '' ? 0 : Number(dados.bpm);

    const animalParaSalvar = {
      ...dados,
      bpm: bpmNumber,
      status: dados.status || 'normal',
    };

    if (animalId === 'novo') {
      create(animalParaSalvar);
      toast({ title: 'Sucesso', description: `Animal criado com sucesso.` });
    } else {
      update(animalId, animalParaSalvar);
      toast({ title: 'Sucesso', description: `Animal atualizado com sucesso.` });
    }
    navigate('/animals');
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}>
      <Button variant="outline" onClick={() => navigate('/animals')} className="mb-4">
        <ArrowLeft /> Voltar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{animalId === 'novo' ? 'Novo Animal' : 'Editar Animal'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {campos.map((field) => (
              <Input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={dados[field]}
                onChange={handleChange}
                type={field === 'bpm' ? 'number' : 'text'}
              />
            ))}
            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
