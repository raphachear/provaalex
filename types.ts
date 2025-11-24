export enum VehicleStatus {
  Disponivel = 'disponivel',
  Vendido = 'vendido',
  Negociacao = 'negociacao'
}

export interface Vehicle {
  id: number;
  modelo: string;
  placa: string;
  status: VehicleStatus;
  preco: number;
  ano?: number;
  cor?: string;
  km?: number;
}

export interface Client {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export type ViewState = 'dashboard' | 'estoque' | 'veiculos' | 'clientes';
