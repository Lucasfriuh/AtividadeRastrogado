import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Edit3, Trash2, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getAll, remove } from '@/lib/utils';

// Fallback initial data
const initialAnimals = [
  { id: 'G001', name: 'Mimosa', status: 'alerta_bpm', bpm: 105, sex: 'Fêmea', age: '5 anos', photoUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'G002', name: 'Campeão', status: 'alerta_area', bpm: 70, sex: 'Macho', age: '3 anos', photoUrl: 'https://images.unsplash.com/photo-1502590464431-3b66d77494d7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 'G003', name: 'Estrela', status: 'normal', bpm: 65, sex: 'Fêmea', age: '4 anos', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZnptBs3RzT3B7HSxitpHCmk2lv7yeCf_uaA&s' },
  { id: 'G004', name: 'Valente', status: 'normal', bpm: 72, sex: 'Macho', age: '2 anos', photoUrl: 'https://images.unsplash.com/photo-1584946815081-7fb21ed8c450?q=80&w=828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'alerta_bpm':
      return (<Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" /> BPM Alto</Badge>);
    case 'alerta_area':
      return (<Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" /> Fora da Área</Badge>);
    case 'normal':
      return (<Badge variant="default"><CheckCircle2 className="mr-1 h-3 w-3" /> Normal</Badge>);
    default:
      return (<Badge variant="secondary">{status}</Badge>);
  }
};

export default function AnimalListPage() {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getAll();
    if (stored.length === 0) {
      localStorage.setItem('rastroGadoAnimals', JSON.stringify(initialAnimals));
      setAnimals(initialAnimals);
    } else {
      setAnimals(stored);
    }
    setIsLoading(false);
  }, []);

  const filtered = animals.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm(`Remover o animal ${id}?`)) {
      remove(id);
      const updated = getAll();
      setAnimals(updated);
      toast({ title: 'Animal Removido', description: `O animal ${id} foi removido.` });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-orange"></div></div>;

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.h1 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, delay:0.1 }} className="text-4xl font-bold text-brand-green">Lista de Animais</motion.h1>
        <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, delay:0.2 }}>
          <Button className="btn-high-contrast" onClick={() => navigate('/animals/novo')}><PlusCircle className="mr-2 h-5 w-5" /> Adicionar Animal</Button>
        </motion.div>
      </div>
      <motion.div className="relative" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.3 }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input placeholder="Buscar por nome ou ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full md:w-1/2 lg:w-1/3" />
      </motion.div>
      <Card>
        <CardHeader><CardTitle>Seu Rebanho</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead className="hidden md:table-cell">Foto</TableHead>
              <TableHead>ID/Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">BPM</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody><AnimatePresence>
              {filtered.length ? filtered.map((animal,index)=>(
                <motion.tr key={animal.id} layout initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.3, delay:index*0.05 }}>
                  <TableCell className="hidden md:table-cell"><img src={animal.photoUrl} alt={animal.name} className="h-12 w-12 rounded-full object-cover"/></TableCell>
                  <TableCell><Link to={`/animals/${animal.id}`}>{animal.name} ({animal.id})</Link></TableCell>
                  <TableCell>{getStatusBadge(animal.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell"><div className="flex items-center"><Activity className="mr-1"/> {animal.bpm} bpm</div></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link to={`/animals/${animal.id}`}><Edit3/></Link></Button>
                    <Button variant="ghost" size="icon" onClick={()=>handleDelete(animal.id)}><Trash2/></Button>
                  </TableCell>
                </motion.tr>
              )) : (<TableRow><TableCell colSpan={5} className="text-center">Nenhum animal encontrado</TableCell></TableRow>)}
            </AnimatePresence></TableBody>
          </Table>
        </CardContent>
        {filtered.length>0 && <CardFooter><p>Mostrando {filtered.length} de {animals.length}</p></CardFooter>}
      </Card>
    </motion.div>
  );
}
