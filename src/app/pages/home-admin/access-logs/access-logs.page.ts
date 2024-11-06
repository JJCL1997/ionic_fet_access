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
      console.log('Access logs loaded:', this.accessLogs);
      this.filteredAccessLogs = [...this.accessLogs];
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al cargar los registros de acceso',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });
      toast.present();
    }
  }

  filterAccessLogs(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredAccessLogs = this.accessLogs.filter(
      (log) =>
        `${log.user_name}`.toLowerCase().includes(searchTerm) ||
        (log.vehicle_plate &&
          log.vehicle_plate.toLowerCase().includes(searchTerm))
    );
  }
  async confirmDelete(accessLogId: number) {
    console.log('Confirm delete for access log ID:', accessLogId);
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

      // Actualiza la lista de accessLogs y filteredAccessLogs eliminando el registro
      this.accessLogs = this.accessLogs.filter(
        (log) => log.log_id !== accessLogId
      );
      this.filteredAccessLogs = this.filteredAccessLogs.filter(
        (log) => log.log_id !== accessLogId
      );

      const toast = await this.toastController.create({
        message: 'Registro de acceso eliminado exitosamente',
        duration: 2000,
        color: 'primary',
        position: 'bottom',
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al eliminar el registro de acceso',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
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
