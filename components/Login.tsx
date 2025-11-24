import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Car, Lock, Mail, Building } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const containerClass = "min-h-screen flex items-center justify-center bg-gray-50 p-4";
  const cardClass = "bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100";
  const titleClass = "text-2xl font-bold text-center text-gray-800 mb-2";
  const subtitleClass = "text-center text-gray-500 mb-8 text-sm";

  if (authMode === 'login') {
    return (
      <div className={containerClass}>
        <div className={cardClass}>
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-200">
              <Car className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className={titleClass}>Revenda Fácil</h1>
          <p className={subtitleClass}>Acesse o painel administrativo</p>
          
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            <div className="relative">
              <Building className="absolute top-9 left-3 text-gray-400 w-5 h-5 z-10" />
              <Input label="CNPJ da Empresa" placeholder="00.000.000/0000-00" className="pl-10" required />
            </div>
            <div className="relative">
              <Mail className="absolute top-9 left-3 text-gray-400 w-5 h-5 z-10" />
              <Input label="E-mail" type="email" placeholder="admin@revenda.com" className="pl-10" required />
            </div>
            <div className="relative">
              <Lock className="absolute top-9 left-3 text-gray-400 w-5 h-5 z-10" />
              <Input label="Senha" type="password" placeholder="******" className="pl-10" required />
            </div>
            
            <Button type="submit" className="w-full py-3 text-lg shadow-blue-200 shadow-lg">Entrar</Button>
            
            <div className="mt-6 text-sm text-center space-y-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-gray-500 hover:text-blue-600 transition-colors block w-full">
                Esqueci minha senha
              </button>
              <button type="button" onClick={() => setAuthMode('register')} className="text-blue-600 font-medium hover:text-blue-800 transition-colors block w-full">
                Não tem conta? Cadastrar revenda
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (authMode === 'register') {
    return (
      <div className={containerClass}>
        <div className={cardClass}>
           <h2 className={titleClass}>Nova Revenda</h2>
           <p className={subtitleClass}>Preencha os dados da sua empresa</p>
           <form className="space-y-3">
              <Input label="Nome Fantasia" required />
              <Input label="CNPJ" required />
              <Input label="E-mail Administrativo" type="email" required />
              <Input label="Senha de Acesso" type="password" required />
              <div className="flex gap-3 mt-6">
                <Button variant="secondary" className="flex-1" onClick={() => setAuthMode('login')}>Voltar</Button>
                <Button className="flex-1" onClick={() => alert('Cadastro realizado!')}>Cadastrar</Button>
              </div>
           </form>
        </div>
      </div>
    );
  }

  return ( // Forgot Password
    <div className={containerClass}>
      <div className={cardClass}>
        <h2 className={titleClass}>Recuperar Senha</h2>
        <p className={subtitleClass}>Informe seu e-mail para receber o link</p>
        <div className="space-y-4">
          <Input label="E-mail cadastrado" type="email" required />
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" className="flex-1" onClick={() => setAuthMode('login')}>Voltar</Button>
            <Button className="flex-1" onClick={() => alert('Link enviado!')}>Enviar Link</Button>
          </div>
        </div>
      </div>
    </div>
  );
};