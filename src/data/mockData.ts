import type { User, Product, Customer, Order, Notification } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Soufiane', nameAr: 'سفيان', email: 'soufiane@tojar.dz', password: 'admin123', role: 'owner', phone: '0555123456', isActive: true, createdAt: '2025-01-01' },
  { id: '2', name: 'Karim', nameAr: 'كريم', email: 'karim@tojar.dz', password: 'admin123', role: 'admin', phone: '0666123456', isActive: true, createdAt: '2025-02-15' },
  { id: '3', name: 'Amina', nameAr: 'أمينة', email: 'amina@tojar.dz', password: 'emp123', role: 'employee', phone: '0777123456', isActive: true, createdAt: '2025-03-10' },
  { id: '4', name: 'Youcef', nameAr: 'يوسف', email: 'youcef@tojar.dz', password: 'emp123', role: 'employee', phone: '0555987654', isActive: true, createdAt: '2025-04-01' },
  { id: '5', name: 'Sara', nameAr: 'سارة', email: 'sara@tojar.dz', password: 'emp123', role: 'employee', phone: '0666987654', isActive: false, createdAt: '2025-05-20' },
];

export const mockProducts: Product[] = [
  { id: '1', slug: 'kelo-cote', name: 'Kelo Cote', nameAr: 'كيلو كوت', price: 22800, description: 'كريم لعلاج الندبات', stock: 45, totalOrders: 312, todayOrders: 12, revenue: 7113600 },
  { id: '2', slug: 'lunette-polarized', name: 'Lunette Polarized', nameAr: 'النظارات', price: 31500, description: 'نظارات شمسية مستقطبة', stock: 28, totalOrders: 198, todayOrders: 9, revenue: 6237000 },
  { id: '3', slug: 'celimax', name: 'Celimax', nameAr: 'المنتج الثالث', price: 18900, description: 'منتج للعناية بالبشرة', stock: 33, totalOrders: 187, todayOrders: 7, revenue: 3534300 },
  { id: '4', slug: 'anua', name: 'Anua', nameAr: 'المنتج الرابع', price: 14000, description: 'زيت لتنظيف البشرة', stock: 52, totalOrders: 156, todayOrders: 7, revenue: 2184000 },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'محمد أحمد', phone: '0551234567', wilaya: 'الجزائر', address: 'حي باب الزوار', totalOrders: 3, totalSpent: 68400, lastOrder: '2025-07-28', createdAt: '2025-01-10' },
  { id: 'c2', name: 'سارة بلقاسم', phone: '0662345678', wilaya: 'وهران', address: 'وسط المدينة', totalOrders: 1, totalSpent: 31500, lastOrder: '2025-07-28', createdAt: '2025-07-28' },
  { id: 'c3', name: 'يوسف لعروسي', phone: '0773456789', wilaya: 'قسنطينة', address: 'المدينة الجديدة', totalOrders: 2, totalSpent: 37800, lastOrder: '2025-07-28', createdAt: '2025-06-15' },
  { id: 'c4', name: 'أمينة بوزيد', phone: '0554567890', wilaya: 'عنابة', address: 'حي سيدي سالم', totalOrders: 1, totalSpent: 14000, lastOrder: '2025-07-28', createdAt: '2025-07-28' },
  { id: 'c5', name: 'إلياس حماني', phone: '0665678901', wilaya: 'سطيف', address: 'حي 1000 مسكن', totalOrders: 5, totalSpent: 114000, lastOrder: '2025-07-28', createdAt: '2025-02-20' },
  { id: 'c6', name: 'فاطمة بن علي', phone: '0776789012', wilaya: 'تلمسان', address: 'المنصورة', totalOrders: 2, totalSpent: 40800, lastOrder: '2025-07-27', createdAt: '2025-04-12' },
  { id: 'c7', name: 'كريم منصوري', phone: '0557890123', wilaya: 'بجاية', address: 'اقبو', totalOrders: 1, totalSpent: 18900, lastOrder: '2025-07-27', createdAt: '2025-07-27' },
  { id: 'c8', name: 'نادية يحيى', phone: '0668901234', wilaya: 'البليدة', address: 'اولاد يعيش', totalOrders: 4, totalSpent: 126000, lastOrder: '2025-07-26', createdAt: '2025-03-05' },
  { id: 'c9', name: 'حسن طالبي', phone: '0779012345', wilaya: 'الجزائر', address: 'الشراقة', totalOrders: 1, totalSpent: 22800, lastOrder: '2025-07-25', createdAt: '2025-07-25' },
  { id: 'c10', name: 'إبراهيم غزال', phone: '0550123456', wilaya: 'وهران', address: 'السانيا', totalOrders: 2, totalSpent: 45600, lastOrder: '2025-07-24', createdAt: '2025-05-18' },
];

export const mockOrders: Order[] = [
  { id: '#2581', customer: mockCustomers[0], product: mockProducts[0], quantity: 1, total: 22800, status: 'new', wilaya: 'الجزائر', address: 'حي باب الزوار', phone: '0551234567', createdAt: '2025-07-28T14:22:00Z', updatedAt: '2025-07-28T14:22:00Z' },
  { id: '#2580', customer: mockCustomers[1], product: mockProducts[1], quantity: 1, total: 31500, status: 'new', wilaya: 'وهران', address: 'وسط المدينة', phone: '0662345678', createdAt: '2025-07-28T14:15:00Z', updatedAt: '2025-07-28T14:15:00Z' },
  { id: '#2579', customer: mockCustomers[2], product: mockProducts[2], quantity: 1, total: 18900, status: 'calling', wilaya: 'قسنطينة', address: 'المدينة الجديدة', phone: '0773456789', createdAt: '2025-07-28T14:07:00Z', updatedAt: '2025-07-28T14:10:00Z' },
  { id: '#2578', customer: mockCustomers[3], product: mockProducts[3], quantity: 1, total: 14000, status: 'new', wilaya: 'عنابة', address: 'حي سيدي سالم', phone: '0554567890', createdAt: '2025-07-28T14:02:00Z', updatedAt: '2025-07-28T14:02:00Z' },
  { id: '#2577', customer: mockCustomers[4], product: mockProducts[0], quantity: 2, total: 45600, status: 'shipped', wilaya: 'سطيف', address: 'حي 1000 مسكن', phone: '0665678901', createdAt: '2025-07-28T13:58:00Z', updatedAt: '2025-07-28T16:00:00Z' },
  { id: '#2576', customer: mockCustomers[5], product: mockProducts[1], quantity: 1, total: 31500, status: 'delivered', wilaya: 'تلمسان', address: 'المنصورة', phone: '0776789012', createdAt: '2025-07-27T10:30:00Z', updatedAt: '2025-07-28T09:15:00Z' },
  { id: '#2575', customer: mockCustomers[6], product: mockProducts[2], quantity: 1, total: 18900, status: 'new', wilaya: 'بجاية', address: 'اقبو', phone: '0557890123', createdAt: '2025-07-27T16:45:00Z', updatedAt: '2025-07-27T16:45:00Z' },
  { id: '#2574', customer: mockCustomers[7], product: mockProducts[1], quantity: 2, total: 63000, status: 'cancelled', wilaya: 'البليدة', address: 'اولاد يعيش', phone: '0668901234', notes: 'الزبون لم يرد', createdAt: '2025-07-26T11:20:00Z', updatedAt: '2025-07-27T14:00:00Z' },
  { id: '#2573', customer: mockCustomers[8], product: mockProducts[0], quantity: 1, total: 22800, status: 'calling', wilaya: 'الجزائر', address: 'الشراقة', phone: '0779012345', createdAt: '2025-07-25T09:10:00Z', updatedAt: '2025-07-26T10:00:00Z' },
  { id: '#2572', customer: mockCustomers[9], product: mockProducts[0], quantity: 1, total: 22800, status: 'shipped', wilaya: 'وهران', address: 'السانيا', phone: '0550123456', createdAt: '2025-07-24T15:30:00Z', updatedAt: '2025-07-25T11:00:00Z' },
  { id: '#2571', customer: mockCustomers[0], product: mockProducts[3], quantity: 1, total: 14000, status: 'returned', wilaya: 'الجزائر', address: 'حي باب الزوار', phone: '0551234567', notes: 'العنوان خاطئ', createdAt: '2025-07-23T14:00:00Z', updatedAt: '2025-07-25T16:00:00Z' },
  { id: '#2570', customer: mockCustomers[1], product: mockProducts[2], quantity: 1, total: 18900, status: 'delivered', wilaya: 'وهران', address: 'وسط المدينة', phone: '0662345678', createdAt: '2025-07-22T10:15:00Z', updatedAt: '2025-07-24T12:30:00Z' },
  { id: '#2569', customer: mockCustomers[2], product: mockProducts[0], quantity: 1, total: 22800, status: 'new', wilaya: 'قسنطينة', address: 'المدينة الجديدة', phone: '0773456789', createdAt: '2025-07-28T18:00:00Z', updatedAt: '2025-07-28T18:00:00Z' },
  { id: '#2568', customer: mockCustomers[4], product: mockProducts[1], quantity: 1, total: 31500, status: 'calling', wilaya: 'سطيف', address: 'حي 1000 مسكن', phone: '0665678901', createdAt: '2025-07-28T17:30:00Z', updatedAt: '2025-07-28T17:45:00Z' },
  { id: '#2567', customer: mockCustomers[7], product: mockProducts[3], quantity: 2, total: 28000, status: 'shipped', wilaya: 'البليدة', address: 'اولاد يعيش', phone: '0668901234', createdAt: '2025-07-28T12:00:00Z', updatedAt: '2025-07-28T16:30:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: '1', type: 'new_order', title: 'طلب جديد', message: 'طلب جديد #2581 من محمد أحمد', isRead: false, createdAt: '2025-07-28T14:22:00Z', orderId: '#2581' },
  { id: '2', type: 'new_order', title: 'طلب جديد', message: 'طلب جديد #2580 من سارة بلقاسم', isRead: false, createdAt: '2025-07-28T14:15:00Z', orderId: '#2580' },
  { id: '3', type: 'status_change', title: 'تحديث حالة', message: 'تم شحن الطلب #2577', isRead: false, createdAt: '2025-07-28T16:00:00Z', orderId: '#2577' },
  { id: '4', type: 'alert', title: 'طلب ملغى', message: 'الطلب #2574 تم إلغاؤه (الزبون لم يرد)', isRead: true, createdAt: '2025-07-27T14:00:00Z', orderId: '#2574' },
  { id: '5', type: 'status_change', title: 'تم التسليم', message: 'تم تسليم الطلب #2576 بنجاح', isRead: true, createdAt: '2025-07-28T09:15:00Z', orderId: '#2576' },
  { id: '6', type: 'system', title: 'تحديث النظام', message: 'تم تحديث لوحة التحكم للإصدار الجديد', isRead: true, createdAt: '2025-07-25T10:00:00Z' },
  { id: '7', type: 'alert', title: 'تنبيه مخزون', message: 'المنتج "النظارات" قارب على النفاذ (28 متبقي)', isRead: false, createdAt: '2025-07-28T08:00:00Z' },
  { id: '8', type: 'status_change', title: 'منتج مسترجع', message: 'الطلب #2571 تم استرجاعه', isRead: true, createdAt: '2025-07-25T16:00:00Z', orderId: '#2571' },
];
