import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/pages/services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = 'all';
  searchTerm: string = ''; 

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  ionViewWillEnter() {
    this.loadUsers(); 
  }

  async loadUsers() {
    try {
      this.users = await this.apiService.getUsers();
      this.filteredUsers = [...this.users];
      this.applyFilters(); 
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  filterUsers(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  filterUsersByRole() {
    this.applyFilters(); 
  }

  private applyFilters() {
    let filtered = [...this.users];

    // Aplica el filtro de rol si no es "all"
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Aplica el filtro de búsqueda
    if (this.searchTerm) {
      filtered = filtered.filter(user =>
        `${user.nombres} ${user.apellidos}`.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredUsers = filtered; 
  }

  goBack() {
    this.router.navigate(['/admin-users']);
  }

  editUser(userId: number) {
    this.router.navigate(['/update-user', userId]);
  }

  async confirmDelete(userId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.deleteUser(userId);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteUser(userId: number) {
    try {
      await this.apiService.deleteUser(userId);
      this.users = this.users.filter(user => user.id !== userId);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
}
