import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.page.html',
  styleUrls: ['./visitors.page.scss'],
})
export class VisitorsPage implements OnInit {
  visitors: any[] = [];
  filteredVisitors: any[] = [];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    await this.loadVisitors();
  }

  async loadVisitors() {
    try {
      this.visitors = await this.apiService.getVisitors();
      this.filteredVisitors = [...this.visitors]; // Inicializa el filtro con todos los visitantes
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al cargar visitantes',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });
      toast.present();
    }
  }

  filterVisitors(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredVisitors = this.visitors.filter(visitor =>
      `${visitor.nombres} ${visitor.apellidos}`.toLowerCase().includes(searchTerm) ||
      visitor.identificacion.toLowerCase().includes(searchTerm) ||
      (visitor.telefono && visitor.telefono.toLowerCase().includes(searchTerm)) ||
      (visitor.motivo_visita && visitor.motivo_visita.toLowerCase().includes(searchTerm))
    );
  }

  async confirmDelete(visitorId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este visitante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.deleteVisitor(visitorId),
        },
      ],
    });
    await alert.present();
  }

  async deleteVisitor(visitorId: number) {
    try {
      await this.apiService.deleteVisitor(visitorId);
      this.visitors = this.visitors.filter(visitor => visitor.id !== visitorId);
      this.filteredVisitors = this.filteredVisitors.filter(visitor => visitor.id !== visitorId);

      const toast = await this.toastController.create({
        message: 'Visitante eliminado exitosamente',
        duration: 2000,
        color: 'primary',
        position: 'bottom',
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al eliminar el visitante',
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
  viewVisitorDetails(visitorId: number) {
    this.router.navigate(['/visitor-details', visitorId.toString()]);
}

  
}
