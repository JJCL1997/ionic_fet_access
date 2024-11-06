import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  userProfile: any = {};
  userName: string = '';

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private userService: UserService, 
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadProfile();

    this.userService.userProfile$.subscribe(profile => {
      if (profile) {
        this.userProfile = profile;
        this.userName = `${profile.nombres} ${profile.apellidos}`;
      }
    });
  }

  async loadProfile() {
    try {
      this.userProfile = await this.apiService.getProfileInfo();
      this.userName = `${this.userProfile.nombres} ${this.userProfile.apellidos}`;
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToEditPassword() {
    this.router.navigate(['/edit-password']); // Navega a la página de cambio de contraseña
  }

  goBack() {
    this.navCtrl.back(); 
  }
}
