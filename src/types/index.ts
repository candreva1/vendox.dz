export type UserRole = 'owner' | 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  password: string; // stored plaintext for demo
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

export type OrderStatus = 'new' | 'calling' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface Order {
  id: string;
  customer: Customer;
  product: Product;
  quantity: number;
  total: number;
  status: OrderStatus;
  wilaya: string;
  address: string;
  phone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Product {
  id: string;
  slug: 'anua' | 'celimax' | 'kelo-cote' | 'lunette-polarized';
  name: string;
  nameAr: string;
  price: number;
  description?: string;
  stock: number;
  imageUrl?: string;
  totalOrders: number;
  todayOrders: number;
  revenue: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  wilaya: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  createdAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  type: 'new_order' | 'status_change' | 'system' | 'alert';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  orderId?: string;
}

export interface Permission {
  canViewDashboard: boolean;
  canManageOrders: boolean;
  canEditOrders: boolean;
  canDeleteOrders: boolean;
  canViewProducts: boolean;
  canManageProducts: boolean;
  canViewCustomers: boolean;
  canManageCustomers: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  owner: {
    canViewDashboard: true, canManageOrders: true, canEditOrders: true, canDeleteOrders: true,
    canViewProducts: true, canManageProducts: true, canViewCustomers: true, canManageCustomers: true,
    canViewAnalytics: true, canManageUsers: true, canManageSettings: true,
  },
  admin: {
    canViewDashboard: true, canManageOrders: true, canEditOrders: true, canDeleteOrders: false,
    canViewProducts: true, canManageProducts: true, canViewCustomers: true, canManageCustomers: true,
    canViewAnalytics: true, canManageUsers: false, canManageSettings: false,
  },
  employee: {
    canViewDashboard: true, canManageOrders: true, canEditOrders: true, canDeleteOrders: false,
    canViewProducts: true, canManageProducts: false, canViewCustomers: true, canManageCustomers: false,
    canViewAnalytics: false, canManageUsers: false, canManageSettings: false,
  },
};
