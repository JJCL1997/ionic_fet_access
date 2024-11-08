import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController , NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userProfile: any = {};
  newPassword: string = '';
  confirmPassword: string = '';
  newPhone: string = '';
  selectedPhoto: File | null = null;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService,
    private navCtrl : NavController
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const profileData = await this.apiService.getProfileInfo();
      this.userProfile = profileData;
      this.newPhone = profileData.telefono || '';
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  onFileSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  async saveProfile() {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('profile_photo', this.selectedPhoto);
    }
    formData.append('telefono', this.newPhone);
    if (this.newPassword) {
      formData.append('password', this.newPassword);
      formData.append('password_confirmation', this.confirmPassword);
    }

    try {
      await this.apiService.updateProfile(formData);
      this.userService.updateUserProfile({ ...this.userProfile, telefono: this.newPhone, profile_photo: this.selectedPhoto ? URL.createObjectURL(this.selectedPhoto) : this.userProfile.profile_photo });

      const toast = await this.toastController.create({
        message: 'Perfil actualizado exitosamente.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/profile-info']);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      const toast = await this.toastController.create({
        message: 'Error al actualizar el perfil.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
  goBack() {
    this.navCtrl.back();
  }
}
