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
    role: 'student', // Valor predeterminado
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

  onlyNumbers(event: KeyboardEvent) {
    const key = event.key;
    // Permite solo teclas de números y ciertas teclas como "Backspace", "Tab", "Arrow keys"
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab' && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault(); // Previene la entrada de cualquier carácter no numérico
    }
  }



  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  async handleValidationErrors(errors: any) {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const messages = errors[key];
        for (const message of messages) {
          await this.showToast(message, 'danger');
        }
      }
    }
  }

  async registerUser() {
    try {
      this.user.role_id = this.mapRoleToId(this.user.role);
      console.log("Role ID a enviar:", this.user.role_id); // Verificar que se asigna correctamente

      delete this.user.role;

      await this.apiService.registerUser(this.user);
      this.showToast('Usuario registrado exitosamente', 'success');

      // Reiniciar el formulario
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
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        await this.handleValidationErrors(error.response.data.errors);
      } else if (error.message) {
        await this.showToast(error.message, 'danger');
      } else {
        await this.showToast('Error desconocido al registrar el usuario', 'danger');
      }
    }
  }

  // Método para mapear el rol a su correspondiente `role_id`
  mapRoleToId(role: string): number {
    switch (role) {
      case 'admin':
        return 1;
      case 'student':
        return 2;
      case 'vigilant':
        return 4;
      default:
        return 3;
    }
  }

  goBack() {
    this.router.navigate(['/admin-users']);
  }
}
