import React, { useState } from 'react';
import { Users, Save, Trash2 } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Client } from '../types';

interface ClientFormProps {
  onSave: (client: Client) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    cidade: '',
    endereco: '',
    bairro: '',
    complemento: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const clientData: Client = {
      id: Date.now(),
      nome: formData.nome,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email
    };
    onSave(clientData);
    setFormData({
      nome: '', cpf: '', telefone: '', email: '', 
      cep: '', cidade: '', endereco: '', bairro: '', complemento: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="text-blue-600 w-6 h-6"/> 
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Cadastro de Cliente</h2>
        </div>

        <div className="space-y-4">
          <Input 
            label="Nome Completo" 
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome do cliente" 
            required 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="CPF" 
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00" 
              required 
            />
            <Input 
              label="Telefone / WhatsApp" 
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000" 
              required 
            />
          </div>
          <Input 
            label="E-mail" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="cliente@email.com" 
            required 
          />
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Endereço</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input label="CEP" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
              <div className="col-span-2">
                <Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
              </div>
            </div>
            <Input label="Endereço Completo" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Rua, Número, Apto" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
              <Input label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setFormData({
              nome: '', cpf: '', telefone: '', email: '', 
              cep: '', cidade: '', endereco: '', bairro: '', complemento: ''
            })}>
              <Trash2 size={16} /> Limpar
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              <Save size={18} /> Salvar Cliente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};