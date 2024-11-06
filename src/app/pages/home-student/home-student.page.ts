import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  userProfile: any = {}; // Almacena la información de perfil
  userName: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.userProfile = await this.apiService.getProfileInfo();
      this.userName = `${this.userProfile.nombres} ${this.userProfile.apellidos}` || 'Estudiante';
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  goToUserManagement() {
    this.router.navigate(['/generate-qr']); 
  }

  viewInfo() {
    this.router.navigate(['/profile-info']); 
  }

  viewOptions() {
    this.router.navigate(['/options']); 
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
