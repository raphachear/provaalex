import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Vehicle, VehicleStatus } from '../types';
import { Car, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  vehicles: Vehicle[];
}

export const Dashboard: React.FC<DashboardProps> = ({ vehicles }) => {
  const disponiveis = vehicles.filter(v => v.status === VehicleStatus.Disponivel).length;
  const vendidos = vehicles.filter(v => v.status === VehicleStatus.Vendido).length;
  const negociacao = vehicles.filter(v => v.status === VehicleStatus.Negociacao).length;
  
  const totalValue = vehicles
    .filter(v => v.status === VehicleStatus.Vendido)
    .reduce((acc, curr) => acc + curr.preco, 0);

  const data = [
    { name: 'Disponíveis', value: disponiveis, color: '#10b981' }, // emerald-500
    { name: 'Vendidos', value: vendidos, color: '#3b82f6' },      // blue-500
    { name: 'Em Negociação', value: negociacao, color: '#f59e0b' }, // amber-500
  ].filter(d => d.value > 0);

  const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
        <span className="text-sm text-gray-500">Última atualização: Hoje, {new Date().toLocaleTimeString()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total em Estoque" 
          value={vehicles.length} 
          icon={Car} 
          colorClass="text-gray-700" 
          bgClass="bg-gray-100" 
        />
        <StatCard 
          title="Disponíveis" 
          value={disponiveis} 
          icon={CheckCircle} 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-100" 
        />
        <StatCard 
          title="Em Negociação" 
          value={negociacao} 
          icon={Clock} 
          colorClass="text-amber-600" 
          bgClass="bg-amber-100" 
        />
        <StatCard 
          title="Vendas Realizadas" 
          value={`R$ ${totalValue.toLocaleString('pt-BR', { notation: 'compact' })}`} 
          icon={DollarSign} 
          colorClass="text-blue-600" 
          bgClass="bg-blue-100" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Distribuição de Frota</h3>
          <div className="h-64 w-full">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Sem dados para exibir
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-6">Atalhos Rápidos</h3>
           <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                 <p className="font-semibold text-gray-800">Exportar Relatório Mensal</p>
                 <p className="text-sm text-gray-500">Baixar dados de vendas em PDF</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                 <p className="font-semibold text-gray-800">Verificar Pendências</p>
                 <p className="text-sm text-gray-500">2 veículos aguardando documentação</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                 <p className="font-semibold text-gray-800">Agendar Vistoria</p>
                 <p className="text-sm text-gray-500">Gerenciar agenda de revisões</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};