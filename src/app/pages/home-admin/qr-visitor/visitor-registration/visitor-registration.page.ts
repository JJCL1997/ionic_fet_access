import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-registration',
  templateUrl: './visitor-registration.page.html',
  styleUrls: ['./visitor-registration.page.scss'],
})
export class VisitorRegistrationPage {
  visitor = {
    nombres: '',
    apellidos: '',
    identificacion: '',
    telefono: '',
    motivo_visita: '',
    vehicle_type: '',
    vehicle_plate: '',
  };

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  onlyNumbers(event: KeyboardEvent) {
    const key = event.key;
    // Permite solo teclas de números y ciertas teclas como "Backspace", "Tab", "Arrow keys"
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab' && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault(); // Previene la entrada de cualquier carácter no numérico
    }
  }


  async registerVisitor() {
    try {
      await this.apiService.registerVisitor(this.visitor);
      this.showToast('Visitante registrado exitosamente', 'primary');

      // Redirige a la página de bienvenida
      this.router.navigate(['/welcome-visitor']);
    } catch (error: any) {
      if (error.errors && error.errors.identificacion) {
        const message = error.errors.identificacion[0];
        this.showToast(`Error: ${message}`, 'danger');
      } else {
        this.showToast('Error al registrar el visitante', 'danger');
      }
      console.error('Detalles del error:', error);
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
