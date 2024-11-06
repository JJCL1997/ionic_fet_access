import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-access-logs',
  templateUrl: './access-logs.page.html',
  styleUrls: ['./access-logs.page.scss'],
})
export class AccessLogsPage implements OnInit {
  accessLogs: any[] = [];
  filteredAccessLogs: any[] = [];
  selectedDate: string = '';
  selectedRole: string = 'all';
  searchTerm: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    await this.loadAccessLogs();
  }

  async loadAccessLogs() {
    try {
      this.accessLogs = await this.apiService.getAccessLogs();
      // Mapear el role_id a un nombre de rol para facilitar su visualización
      this.accessLogs = this.accessLogs.map(log => ({
        ...log,
        user_role: this.mapRoleIdToName(log.role_id)
      }));
      this.applyFilters();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al cargar los registros de acceso',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  // Función para mapear role_id a un nombre de rol
  mapRoleIdToName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'admin';
      case 2:
        return 'student';
      case 3:
        return 'visitor';
      case 4:
        return 'vigilant';
      default:
        return 'No disponible';
    }
  }

  // Aplica todos los filtros seleccionados (fecha, rol, y búsqueda)
  applyFilters() {
    const normalizedSelectedDate = this.selectedDate ? this.selectedDate.split('T')[0] : '';
    this.filteredAccessLogs = this.accessLogs.filter(log => {
      // Comparación de fecha asegurándose de que log.access_time y selectedDate tengan el mismo formato
      const logDate = log.access_time.split(' ')[0];
      const matchesDate = normalizedSelectedDate ? logDate === normalizedSelectedDate : true;
      const matchesRole = this.selectedRole === 'all' || log.user_role === this.selectedRole;
      const matchesSearchTerm = this.searchTerm
        ? log.user_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (log.vehicle_plate &&
            log.vehicle_plate.toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;
      return matchesDate && matchesRole && matchesSearchTerm;
    });
  }

  // Maneja la entrada del campo de búsqueda y actualiza el filtro
  filterAccessLogs(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  async confirmDelete(accessLogId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este registro de acceso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.deleteAccessLog(accessLogId),
        },
      ],
    });
    await alert.present();
  }

  async deleteAccessLog(accessLogId: number) {
    try {
      await this.apiService.deleteAccessLog(accessLogId);
      // Actualiza la lista de registros eliminando el acceso borrado
      this.accessLogs = this.accessLogs.filter(log => log.log_id !== accessLogId);
      this.applyFilters();
      const toast = await this.toastController.create({
        message: 'Registro de acceso eliminado exitosamente',
        duration: 2000,
        color: 'primary',
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al eliminar el registro de acceso',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  goBack() {
    this.router.navigate(['/home-admin']);
  }

  goToAccessLogDetails(logId: number) {
    this.router.navigate(['/access-logs-details', logId]);
  }
}
