import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Bot } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  email: string;
  senha: string;
}

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      // Simulando login
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    window.history.pushState({}, '', '/register');
    // Dispara o evento popstate manualmente para atualizar a página
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-md mx-auto">
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <a 
            href="/"
            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Bot className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              ChatFood
            </span>
          </a>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Login
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>

            {/* Link para Cadastro */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Cadastre-se aqui
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}