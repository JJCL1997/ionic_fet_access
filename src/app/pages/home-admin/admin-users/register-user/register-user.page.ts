import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage {
  user: any = {
    nombres: '',
    apellidos: '',
    email: '',
    codigo: '',
    telefono: '',
    role: 'student', // Role inicial para asignar automáticamente el id
    password: '',
    password_confirmation: '',
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController
  ) {}

  isFormValid() {
    return (
      this.user.nombres &&
      this.user.apellidos &&
      this.user.email &&
      this.user.codigo &&
      this.user.password &&
      this.user.password === this.user.password_confirmation
    );
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async registerUser() {
    try {
      // Asignar el role_id según el valor de role
      this.user.role_id = this.user.role === 'admin' ? 1 : (this.user.role === 'student' ? 2 : 3);
      delete this.user.role; // Eliminamos el campo 'role' si el backend solo necesita 'role_id'

      // Llamada al servicio para registrar el usuario
      await this.apiService.registerUser(this.user);
      
      this.showToast('Usuario registrado exitosamente', 'success');

      // Limpiar el formulario
      this.user = {
        nombres: '',
        apellidos: '',
        email: '',
        codigo: '',
        telefono: '',
        role: 'student',
        password: '',
        password_confirmation: '',
      };

      this.router.navigate(['/admin-users']);
    } catch (error) {
      this.showToast((error as Error).message);
    }
  }

  goBack() {
    this.router.navigate(['/admin-users']);
  }
}
