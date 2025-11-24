import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  List, 
  LogOut, 
  PlusCircle 
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: 'dashboard' as ViewState, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'estoque' as ViewState, label: 'Estoque', icon: List },
    { id: 'veiculos' as ViewState, label: 'Cadastrar Veículo', icon: PlusCircle },
    { id: 'clientes' as ViewState, label: 'Cadastrar Cliente', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl flex-shrink-0 transition-all">
      <div className="p-6">
        <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
           <div className="bg-blue-600 p-2 rounded-lg">
             <Car className="text-white h-6 w-6" />
           </div>
           <span>Revenda<span className="text-blue-400">Fácil</span></span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-colors"
        >
          <LogOut size={20} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};