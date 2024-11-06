import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.loadUser(userId);
  }

  async loadUser(userId: string | null) {
    if (!userId) return;

    try {
      this.user = await this.apiService.getUserById(userId);
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }

  async updateUser() {
    try {
      await this.apiService.updateUser(this.user.id, this.user);
      this.presentToast('Usuario actualizado exitosamente', 'success');
      this.router.navigate(['/view-users']); 
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      this.presentToast('Error al actualizar el usuario', 'danger');
    }
  }

  goBack() {
    this.router.navigate(['/view-users']);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
