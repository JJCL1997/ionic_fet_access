import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';

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
    try {
      const response = await axios.post(`${this.baseUrl}/register`, user);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Error desconocido al registrar el usuario');
      }
      throw error;
    }
  }


  async getQrCode(): Promise<string> {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${this.baseUrl}/generate-qr`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.qr_code;
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
  async validateQrCode(token: string, email: string): Promise<any> {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.post(
      `${this.baseUrl}/validate-qr`, // Usa backticks aquí
      { token, email },
      { headers: { Authorization: `Bearer ${authToken}` } } // Usa backticks aquí también
    );
    return response.data;
}


}
