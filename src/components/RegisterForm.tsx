import React, { useState } from 'react';
import { Eye, EyeOff, Search, Loader2, Bot } from 'lucide-react';
import Select from 'react-select';
import { useMask } from '@react-input/mask';
import toast, { Toaster } from 'react-hot-toast';

const businessTypes = [
  { value: 'padaria', label: 'Padaria' },
  { value: 'lanchonete', label: 'Lanchonete' },
  { value: 'bar', label: 'Bar' },
  { value: 'pizzaria', label: 'Pizzaria' },
  { value: 'mercado', label: 'Mercado' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'acougue', label: 'Açougue' },
  { value: 'hortifruti', label: 'Hortifruti' },
  { value: 'doceria', label: 'Doceria' }
];

interface FormData {
  businessType: { value: string; label: string } | null;
  documentType: 'cnpj' | 'cpf';
  document: string;
  razaoSocial: string;
  nomeFantasia: string;
  nomeUsuario: string;
  email: string;
  whatsapp: string;
  senha: string;
  confirmarSenha: string;
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessType: null,
    documentType: 'cnpj',
    document: '',
    razaoSocial: '',
    nomeFantasia: '',
    nomeUsuario: '',
    email: '',
    whatsapp: '',
    senha: '',
    confirmarSenha: ''
  });

  const documentInputRef = useMask({
    mask: formData.documentType === 'cnpj' ? '99.999.999/9999-99' : '999.999.999-99',
    replacement: { 9: /\d/ }
  });

  const whatsappInputRef = useMask({
    mask: '(99) 9 9999-9999',
    replacement: { 9: /\d/ }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessType) {
      toast.error('Selecione o tipo de negócio');
      return;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.documentType === 'cnpj' && !formData.razaoSocial) {
      toast.error('Razão Social é obrigatória para CNPJ');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-2xl mx-auto">
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Bot className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              ChatFood
            </span>
          </button>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Cadastro de Empresa
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Negócio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Tipo de Negócio *
              </label>
              <Select
                options={businessTypes}
                value={formData.businessType}
                onChange={(value) => setFormData({ ...formData, businessType: value })}
                placeholder="Selecione o tipo de negócio"
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable
                required
              />
            </div>

            {/* Tipo de Documento */}
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.documentType === 'cnpj'}
                  onChange={() => setFormData({ ...formData, documentType: 'cnpj' })}
                  className="mr-2 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">CNPJ</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.documentType === 'cpf'}
                  onChange={() => setFormData({ ...formData, documentType: 'cpf' })}
                  className="mr-2 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">CPF</span>
              </label>
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {formData.documentType.toUpperCase()} *
              </label>
              <div className="relative">
                <input
                  ref={documentInputRef}
                  type="text"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  placeholder={formData.documentType === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00'}
                  required
                />
                {formData.documentType === 'cnpj' && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Razão Social - apenas para CNPJ */}
            {formData.documentType === 'cnpj' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Razão Social *
                </label>
                <input
                  type="text"
                  value={formData.razaoSocial}
                  onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  required
                />
              </div>
            )}

            {/* Nome Fantasia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Nome Fantasia *
              </label>
              <input
                type="text"
                value={formData.nomeFantasia}
                onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            {/* Nome do Usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Nome do Usuário *
              </label>
              <input
                type="text"
                value={formData.nomeUsuario}
                onChange={(e) => setFormData({ ...formData, nomeUsuario: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                WhatsApp *
              </label>
              <input
                ref={whatsappInputRef}
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                placeholder="(00) 0 0000-0000"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Senha *
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

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Confirmar Senha *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}