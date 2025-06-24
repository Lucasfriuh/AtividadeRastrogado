import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const STORAGE_KEY = 'rastroGadoAnimals';

export function getAll() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getById(id) {
  return getAll().find(item => item.id === id) || null;
}

export function create(animal) {
  const animais = getAll();
  const novo = { id: Date.now().toString(), ...animal };
  animais.push(novo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animais));
  return novo;
}

export function update(id, dadosAtualizados) {
  const animais = getAll();
  const index = animais.findIndex(item => item.id === id);
  if (index === -1) return null;
  animais[index] = { ...animais[index], ...dadosAtualizados };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animais));
  return animais[index];
}

export function remove(id) {
  const animais = getAll().filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animais));
}