import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/pages/services/api.service'; 

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor(
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiService 
  ) {}

  goToUserManagement() {
    this.router.navigate(['/admin-users']); 
  }

  goBack() {
    this.router.navigate(['/admin-users']);
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

  ngOnInit() {}
}
