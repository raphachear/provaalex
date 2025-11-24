import React, { useState } from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { FileText, FileSpreadsheet, Search, Filter } from 'lucide-react';
import { Button } from './Button';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InventoryProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ vehicles, onEdit }) => {
  const [filter, setFilter] = useState<'todos' | VehicleStatus>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(v => {
    const matchesStatus = filter === 'todos' ? true : v.status === filter;
    const matchesSearch = 
      v.modelo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.placa.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportExcel = () => {
    const header = "ID;Modelo;Placa;Status;Preço;Ano;Cor;KM\n";
    const rows = filteredVehicles.map(v => 
      `${v.id};${v.modelo};${v.placa};${v.status};${v.preco};${v.ano || ''};${v.cor || ''};${v.km || ''}`
    ).join("\n");
    
    // Add BOM for correct Excel UTF-8 encoding
    const blob = new Blob(["\ufeff" + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque_veiculos.csv';
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Relatório de Estoque - Revenda Fácil", 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`, 14, 30);

    const tableColumn = ["Modelo", "Placa", "Ano", "Status", "Preço"];
    const tableRows = filteredVehicles.map(v => [
      v.modelo,
      v.placa,
      v.ano || '-',
      v.status.toUpperCase(),
      v.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] } // Blue-600
    });

    doc.save("relatorio_estoque.pdf");
  };

  const getStatusBadge = (status: VehicleStatus) => {
    switch(status) {
      case VehicleStatus.Disponivel:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Disponível</span>;
      case VehicleStatus.Vendido:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Vendido</span>;
      case VehicleStatus.Negociacao:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Em Negociação</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Controle de Estoque</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={exportPDF}>
              <FileText size={16} /> PDF
            </Button>
            <Button variant="secondary" onClick={exportExcel}>
              <FileSpreadsheet size={16} /> Excel
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['todos', VehicleStatus.Disponivel, VehicleStatus.Negociacao, VehicleStatus.Vendido].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === status 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'todos' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar placa ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Modelo</th>
              <th className="px-6 py-4">Placa</th>
              <th className="px-6 py-4">Ano</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Preço</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{v.modelo}</td>
                  <td className="px-6 py-4 font-mono text-gray-600">{v.placa}</td>
                  <td className="px-6 py-4 text-gray-600">{v.ano || '-'}</td>
                  <td className="px-6 py-4">{getStatusBadge(v.status)}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {v.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onEdit(v)}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-xs uppercase tracking-wide"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Nenhum veículo encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};