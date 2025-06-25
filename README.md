# 🐄 RastroGado

**RastroGado** é um sistema web moderno para monitoramento de gado em fazendas. Com ele, você pode visualizar os animais cadastrados, acompanhar seus sinais vitais, localizá-los no mapa e configurar alertas personalizados — tudo isso com uma interface acessível e responsiva.

---

## 🔧 Funcionalidades

- 📋 **Cadastro e listagem de animais**
- 🗺️ **Mapa interativo com posição do gado**
- ⚠️ **Alertas automáticos de BPM e localização**
- 👤 **Perfil e configurações do usuário**
- 🔔 **Notificações visuais**
- 📱 **Responsivo para mobile e desktop**

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js v18 ou superior
- npm (ou yarn)

### Passos

1. **Clone o repositório** (ou baixe como ZIP):
   ```bash
   git clone https://[https://github.com/Lucasfriuh/AtividadeRastrogado]
   cd rastrogado
Instale as dependências:

bash
Copiar
Editar
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm run dev
Abra o navegador:

No PC: http://localhost:****

🛠 Tecnologias utilizadas
React com Vite

React Router DOM (navegação entre páginas)

TailwindCSS (estilização)

Lucide Icons (ícones)

Framer Motion (animações)

LocalStorage (armazenamento local de configurações)

📂 Estrutura de diretórios
bash
Copiar
Editar
src/
├─ components/       # Componentes reutilizáveis (UI, botão, input, etc.)
├─ pages/            # Páginas principais (Dashboard, Mapa, Settings...)
├─ lib/              # Funções utilitárias e acesso a dados locais
├─ App.jsx           # Roteamento principal
├─ main.jsx          # Ponto de entrada
📌 Observações
O projeto não possui backend: os dados são armazenados no localStorage do navegador.

Ideal para prototipagem, testes de UX ou demonstrações offline.

