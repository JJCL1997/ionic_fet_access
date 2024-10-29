import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-vigilant',
  templateUrl: './home-vigilant.page.html',
  styleUrls: ['./home-vigilant.page.scss'],
})
export class HomeVigilantPage implements OnInit {
  vigilanteName: string | null = '';

  constructor(private toastController: ToastController, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.vigilanteName = localStorage.getItem('userName');
  }

  async logout() {
    try {
      await this.apiService.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');

      const toast = await this.toastController.create({
        message: 'Sesión cerrada exitosamente',
        duration: 2000,
        color: 'primary',
        position: 'bottom'
      });
      toast.present();

      this.router.navigate(['/login']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al cerrar sesión',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      toast.present();
    }
  }
}
