import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { Input } from './Input';
import { Button } from './Button';
import { Car, Save, ArrowLeft } from 'lucide-react';

interface VehicleFormProps {
  onSave: (vehicle: Vehicle) => void;
  initialData?: Vehicle;
  onCancel?: () => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ onSave, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    modelo: '',
    placa: '',
    renavam: '',
    chassi: '',
    km: '',
    cor: '',
    ano: '',
    preco: '',
    propNome: '',
    propCpf: '',
    propTel: '',
    propCep: '',
    propEnd: '',
    propBairro: '',
    propCidade: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        modelo: initialData.modelo,
        placa: initialData.placa,
        renavam: '00000000000', // Mock data for internal fields not in main interface
        chassi: '00000000000000000',
        km: initialData.km?.toString() || '',
        cor: initialData.cor || '',
        ano: initialData.ano?.toString() || '',
        preco: initialData.preco.toString(),
        propNome: '', // Mock data
        propCpf: '',
        propTel: '',
        propCep: '',
        propEnd: '',
        propBairro: '',
        propCidade: ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: Vehicle = {
      id: initialData ? initialData.id : Date.now(),
      modelo: formData.modelo,
      placa: formData.placa,
      status: initialData ? initialData.status : VehicleStatus.Disponivel,
      preco: Number(formData.preco) || 0,
      ano: Number(formData.ano),
      km: Number(formData.km),
      cor: formData.cor
    };
    onSave(newVehicle);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Car className="text-blue-600 w-6 h-6"/> 
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {initialData ? 'Editar Veículo' : 'Cadastro de Veículo'}
            </h2>
          </div>
          {onCancel && (
             <Button type="button" variant="secondary" onClick={onCancel}>
               <ArrowLeft size={16} /> Voltar
             </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dados do Veículo */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Dados do Veículo
            </h3>
            
            <Input label="Modelo" name="modelo" placeholder="Ex: Honda Civic 2.0" required value={formData.modelo} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
               <Input label="Placa" name="placa" placeholder="ABC-1234" required value={formData.placa} onChange={handleChange} />
               <Input label="Preço (R$)" name="preco" type="number" placeholder="0,00" required value={formData.preco} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Input label="Ano Fab." name="ano" type="number" placeholder="2023" value={formData.ano} onChange={handleChange} />
               <Input label="Cor" name="cor" placeholder="Prata" value={formData.cor} onChange={handleChange} />
            </div>
            <Input label="Renavam" name="renavam" value={formData.renavam} onChange={handleChange} />
            <Input label="Chassi" name="chassi" value={formData.chassi} onChange={handleChange} />
            <Input label="Quilometragem" name="km" type="number" value={formData.km} onChange={handleChange} />
          </div>

          {/* Dados do Proprietário */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Proprietário Anterior
            </h3>
            
            <Input label="Nome Completo" name="propNome" value={formData.propNome} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="CPF" name="propCpf" value={formData.propCpf} onChange={handleChange} />
              <Input label="Telefone" name="propTel" value={formData.propTel} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
               <div className="col-span-1">
                 <Input label="CEP" name="propCep" value={formData.propCep} onChange={handleChange} />
               </div>
               <div className="col-span-2">
                 <Input label="Cidade" name="propCidade" value={formData.propCidade} onChange={handleChange} />
               </div>
            </div>
            <Input label="Endereço" name="propEnd" value={formData.propEnd} onChange={handleChange} />
            <Input label="Bairro" name="propBairro" value={formData.propBairro} onChange={handleChange} />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
           <Button type="button" variant="secondary" onClick={() => onCancel ? onCancel() : window.history.back()}>Cancelar</Button>
           <Button type="submit" variant="success">
             <Save size={18} /> {initialData ? 'Atualizar Veículo' : 'Salvar Veículo'}
           </Button>
        </div>
      </form>
    </div>
  );
};