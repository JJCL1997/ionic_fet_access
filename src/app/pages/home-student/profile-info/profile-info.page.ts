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
      const profileData = await this.apiService.getProfileInfo();
      this.userProfile = profileData;
      this.userName = `${this.userProfile.nombres} ${this.userProfile.apellidos}`;

      // Asegúrate de que la URL de la foto esté correctamente formateada
      if (this.userProfile.profile_photo) {
        this.userProfile.profile_photo = this.userProfile.profile_photo; // No alterar la URL
      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToEditPassword() {
    this.router.navigate(['/edit-password']);
  }

  goBack() {
    this.router.navigate(['/home-student']);
  }
}
