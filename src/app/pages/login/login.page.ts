import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const response = await this.apiService.login(this.email, this.password);

      const userRole = localStorage.getItem('userRole'); 

      switch (userRole) {
        case 'admin':
          console.log('Redirigiendo a home-admin');
          this.router.navigate(['/home-admin']);
          break;
        case 'student':
          console.log('Redirigiendo a home-student');
          this.router.navigate(['/home-student']);
          break;
        case 'vigilant':
          console.log('Redirigiendo a home-vigilant');
          this.router.navigate(['/home-vigilant']);
          break;
        default:
          throw new Error('Rol de usuario no reconocido');
      }
      
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales inválidas',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
