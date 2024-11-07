import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Cambia esto según la URL de tu API

  constructor() {}

  async generateQrCode(vehicleType: string, vehiclePlate: string): Promise<any> {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        `${this.baseUrl}/generate-qr`,
        { vehicle_type: vehicleType, vehicle_plate: vehiclePlate },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data; // Devuelve el QR generado
    } catch (error: any) {
      console.error("Error al generar el código QR:", error.response ? error.response.data : error);
      throw new Error(error.response?.data.message || 'Error desconocido al generar el código QR');
    }
  }

  async validateQrCode(token: string, email: string, vehicleType?: string, vehiclePlate?: string): Promise<any> {
    const authToken = localStorage.getItem('authToken'); // Obtener el token de autenticación

    try {
      const response = await axios.post(
        `${this.baseUrl}/validate-qr`,
        {
          token,
          email,
          vehicle_type: vehicleType,
          vehicle_plate: vehiclePlate
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data; // Devuelve la respuesta del servidor
    } catch (error: any) {
      console.error("Error al validar el código QR:", error.response ? error.response.data : error);
      throw new Error(error.response?.data.message || 'Error desconocido al validar el código QR');
    }
  }

  async checkExistingAccess(token: string): Promise<boolean> {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.get(`${this.baseUrl}/check-access/${token}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data.exists; // Suponiendo que la respuesta tiene un campo `exists`
    } catch (error) {
      console.error("Error al verificar el acceso existente:", error);
      throw new Error('Error desconocido al verificar el acceso existente');
    }
  }
}
