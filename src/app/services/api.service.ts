import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  async login(email: string, password: string) {
    const response = await axios.post(`${this.baseUrl}/login`, { email, password });
    const token = response.data.token;
    const role = response.data.user.role;
    const nombreUsuario = response.data.user.nombres;

    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', nombreUsuario);
    } else {
      throw new Error('No se recibió un token de autenticación');
    }

    return response.data;
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  async getUsers() {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.get(`${this.baseUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getUserById(userId: string) {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${this.baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async updateUser(userId: string, updatedData: any) {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${this.baseUrl}/users/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async deleteUser(userId: number) {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${this.baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async registerUser(user: any): Promise<any> {
    const token = localStorage.getItem('authToken');
    console.log("Datos del usuario a registrar:", user); // Asegúrate de que `role_id` esté presente
    try {
      const response = await axios.post(
        `${this.baseUrl}/register`,
        user,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      console.log('Registro exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Detalles del error:', error.response?.data);
      throw new Error(error.response?.data.message || 'Error desconocido al registrar el usuario');
    }
  }

  async getQrCode(vehicleType: string, vehiclePlate: string): Promise<string> {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(
      `${this.baseUrl}/generate-qr`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { vehicle_type: vehicleType, vehicle_plate: vehiclePlate } // Enviar parámetros en la URL
      }
    );
    return response.data.qr_code;
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





  async logout(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (token) {
      await axios.post(`${this.baseUrl}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('authToken');
    }
  }

  async getVisitors(): Promise<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.get(`${this.baseUrl}/visitors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async deleteVisitor(visitorId: number): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    await axios.delete(`${this.baseUrl}/visitors/${visitorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getVisitorById(visitorId: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.get(`${this.baseUrl}/visitors/${visitorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getAccessLogDetails(accessLogId: number): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.get(`${this.baseUrl}/access-logs/${accessLogId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

async getAccessLogs(): Promise<any[]> {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No se encontró un token de autenticación');

  const response = await axios.get(`${this.baseUrl}/access-logs`, {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}



  async getAccessLogById(accessLogId: number): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.get(`${this.baseUrl}/access-logs/${accessLogId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async deleteAccessLog(accessLogId: number): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No se encontró un token de autenticación');

    console.log(`Deleting access log with ID: ${accessLogId} at ${this.baseUrl}/access-logs/${accessLogId}`);

    await axios.delete(`${this.baseUrl}/access-logs/${accessLogId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getVisitorQrCode(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/generate-visitor-qr`);
    return response.data;
  }

  async registerVisitor(visitorData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/visitor/register`, visitorData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        throw error.response.data; // Lanza la respuesta completa
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    }
  }

  async getProfileInfo(): Promise<any> {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${this.baseUrl}/student/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Asegúrate de retornar siempre los datos actualizados
  }

  async updateProfile(formData: FormData): Promise<any> {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${this.baseUrl}/student/update-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }

  async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `${this.baseUrl}/user/update-password`,
        { current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data); // Muestra detalles del error si ocurre
        throw new Error(error.response.data.message || 'Error desconocido al actualizar la contraseña');
      } else {
        throw new Error('Error de red o servidor');
      }
    }
  }
}
