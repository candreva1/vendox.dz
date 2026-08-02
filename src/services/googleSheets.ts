/**
 * Google Sheets Integration Service
 * 
 * This file contains the service layer for Google Sheets integration.
 * Currently using stub implementations. To activate:
 * 1. Create a Google Cloud project and enable the Sheets API
 * 2. Create a service account and download the credentials JSON
 * 3. Share your Google Sheet with the service account email
 * 4. Set VITE_GOOGLE_SHEETS_ID and VITE_GOOGLE_SERVICE_ACCOUNT env vars
 * 5. Replace stub implementations below with real API calls
 */

import type { Order, Customer } from '../types';

export const SHEETS_CONFIG = {
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID || localStorage.getItem('tojar_sheets_id') || '',
  ordersSheetName: 'Orders',
  customersSheetName: 'Customers',
  productsSheetName: 'Products',
  analyticsSheetName: 'Analytics',
};

export interface SheetRow {
  [key: string]: string | number | boolean;
}

// Returns true if the integration is configured
export function isSheetsConfigured(): boolean {
  const sheetsId = import.meta.env.VITE_GOOGLE_SHEETS_ID || localStorage.getItem('tojar_sheets_id');
  return Boolean(sheetsId);
}

// Fetch all rows from a named sheet
export async function fetchSheetRows(sheetName: string): Promise<SheetRow[]> {
  if (!isSheetsConfigured()) {
    console.warn('[GoogleSheets] Not configured. Returning empty rows for:', sheetName);
    return [];
  }
  // TODO: Implement with Google Sheets API
  // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/...`);
  throw new Error('Google Sheets integration not yet connected.');
}

// Append a row to a sheet
export async function appendSheetRow(sheetName: string, row: SheetRow): Promise<void> {
  if (!isSheetsConfigured()) {
    console.warn('[GoogleSheets] Not configured. Skipping append to:', sheetName);
    return;
  }
  // TODO: Implement
  throw new Error('Google Sheets integration not yet connected.');
}

// Update a specific row by row index
export async function updateSheetRow(sheetName: string, rowIndex: number, row: SheetRow): Promise<void> {
  if (!isSheetsConfigured()) {
    console.warn('[GoogleSheets] Not configured. Skipping update in:', sheetName);
    return;
  }
  // TODO: Implement
  throw new Error('Google Sheets integration not yet connected.');
}

// Sync all orders to the Orders sheet
export async function syncOrdersToSheet(orders: Order[]): Promise<void> {
  return appendSheetRow(SHEETS_CONFIG.ordersSheetName, { count: orders.length });
}

// Sync all customers to the Customers sheet
export async function syncCustomersToSheet(customers: Customer[]): Promise<void> {
  return appendSheetRow(SHEETS_CONFIG.customersSheetName, { count: customers.length });
}
