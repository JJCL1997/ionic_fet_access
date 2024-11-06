import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private apiService: ApiService, private toastController: ToastController , private navCtrl : NavController) {}

  async updatePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      await this.showToast('Por favor, completa todos los campos.', 'danger');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.showToast('La nueva contraseña y la confirmación no coinciden.', 'danger');
      return;
    }

    try {
      const result = await this.apiService.updatePassword(this.currentPassword, this.newPassword, this.confirmPassword);
      await this.showToast('Contraseña actualizada exitosamente.', 'success');
    } catch (error: any) {
      await this.showToast(error.message || 'Error al actualizar la contraseña.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
  goBack() {
    this.navCtrl.back(); 
  }
}
