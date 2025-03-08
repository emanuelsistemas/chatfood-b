import React, { useState, useEffect } from 'react';
import { Bot, Moon, Sun, MessageSquare, LogIn, UserPlus } from 'lucide-react';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register'>('home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Adiciona listener para mudanças no histórico
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/register') {
        setCurrentPage('register');
      } else if (path === '/login') {
        setCurrentPage('login');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Checa a rota inicial

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPage === 'register') {
    return <RegisterForm />;
  }

  if (currentPage === 'login') {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="fixed w-full p-4 backdrop-blur-lg bg-white/10 dark:bg-gray-900/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              ChatFood
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/login');
                setCurrentPage('login');
              }}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/register');
                setCurrentPage('register');
              }}
              className="px-4 py-2 rounded-lg border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Cadastrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto pt-32 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold dark:text-white">
              Delivery Inteligente via
              <span className="text-green-500"> WhatsApp</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Revolucione seu negócio com nossa plataforma de delivery integrada com IA.
              Atendimento automatizado, pedidos simplificados e mais vendas pelo WhatsApp.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  window.history.pushState({}, '', '/register');
                  setCurrentPage('register');
                }}
                className="px-8 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2 text-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Começar Agora
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            {/* Círculos decorativos */}
            <div className="absolute -z-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -z-10 w-48 h-48 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-2xl top-1/4 right-1/4"></div>
            
            {/* Ilustração principal */}
            <div className="relative bg-gradient-to-br from-purple-100 to-green-100 dark:from-purple-900/50 dark:to-green-900/50 p-8 rounded-3xl shadow-xl backdrop-blur-sm">
              {/* Elementos decorativos que simulam uma interface de chat */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-xs">
                    <p className="text-sm">Olá! Gostaria de fazer um pedido 🍕</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-green-500 rounded-2xl rounded-tr-none p-4 shadow-sm max-w-xs">
                    <p className="text-sm text-white">Claro! Aqui está nosso cardápio digital 📱</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-xs">
                    <p className="text-sm">Quero uma pizza grande de margherita 🍕</p>
                  </div>
                </div>
              </div>
              
              {/* Elementos flutuantes decorativos */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-xl rotate-12 shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;