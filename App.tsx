import React, { useState } from 'react';
import { ViewState, Vehicle, VehicleStatus, Client } from './types';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { VehicleForm } from './components/VehicleForm';
import { ClientForm } from './components/ClientForm';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  // Simulated Database State
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, modelo: 'Honda Civic Touring', placa: 'ABC-1234', status: VehicleStatus.Disponivel, preco: 145000, ano: 2021, km: 45000, cor: 'Branco' },
    { id: 2, modelo: 'Toyota Corolla Altis', placa: 'XYZ-9876', status: VehicleStatus.Vendido, preco: 138000, ano: 2020, km: 52000, cor: 'Preto' },
    { id: 3, modelo: 'Chevrolet Onix Plus', placa: 'DEF-5678', status: VehicleStatus.Negociacao, preco: 85000, ano: 2023, km: 12000, cor: 'Prata' },
    { id: 4, modelo: 'Jeep Compass Longitude', placa: 'JEP-0001', status: VehicleStatus.Disponivel, preco: 160000, ano: 2022, km: 28000, cor: 'Cinza' },
    { id: 5, modelo: 'VW T-Cross Highline', placa: 'VWT-2022', status: VehicleStatus.Disponivel, preco: 125000, ano: 2021, km: 35000, cor: 'Azul' },
  ]);

  const [clients, setClients] = useState<Client[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>(undefined);

  const handleSaveVehicle = (vehicleData: Vehicle) => {
    if (editingVehicle) {
      // Edit existing
      setVehicles(vehicles.map(v => v.id === vehicleData.id ? vehicleData : v));
      alert('Veículo atualizado com sucesso!');
    } else {
      // Create new
      setVehicles([...vehicles, vehicleData]);
      alert('Veículo cadastrado com sucesso!');
    }
    setEditingVehicle(undefined);
    setCurrentView('estoque');
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setCurrentView('veiculos');
  };

  const handleSaveClient = (client: Client) => {
    setClients([...clients, client]);
    alert('Cliente cadastrado com sucesso!');
    // Optionally redirect or reset
    // setCurrentView('dashboard'); 
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={(view) => {
          setCurrentView(view);
          if (view !== 'veiculos') setEditingVehicle(undefined); // Reset edit state when changing views
        }} 
        onLogout={() => setIsAuthenticated(false)} 
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {currentView === 'dashboard' && <Dashboard vehicles={vehicles} />}
          {currentView === 'estoque' && (
            <Inventory 
              vehicles={vehicles} 
              onEdit={handleEditVehicle} 
            />
          )}
          {currentView === 'veiculos' && (
            <VehicleForm 
              onSave={handleSaveVehicle} 
              initialData={editingVehicle}
              onCancel={() => {
                setEditingVehicle(undefined);
                setCurrentView('estoque');
              }}
            />
          )}
          {currentView === 'clientes' && <ClientForm onSave={handleSaveClient} />}
        </div>
      </main>
    </div>
  );
}