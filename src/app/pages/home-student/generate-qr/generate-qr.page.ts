  import { Component, OnInit } from '@angular/core';
  import { ApiService } from 'src/app/services/api.service';
  import { NavController, ToastController } from '@ionic/angular';

  @Component({
    selector: 'app-generate-qr',
    templateUrl: './generate-qr.page.html',
    styleUrls: ['./generate-qr.page.scss'],
  })
  export class GenerateQrPage implements OnInit {
    qrCode: string | null = null;
    vehicleType: string = '';
    vehiclePlate: string = '';
    isPlateDisabled: boolean = false;

    constructor(
      private apiService: ApiService,
      private navCtrl: NavController,
      private toastController: ToastController
    ) {}

    ngOnInit(): void {
      // Ejemplo de lógica de inicialización
      this.initializeData();
    }

    initializeData() {
      // Lógica para inicializar datos
    }


    onVehicleTypeChange() {
      this.isPlateDisabled = this.vehicleType === 'no_registra';
      if (this.isPlateDisabled) {
        this.vehiclePlate = '';
      }
    }

    async loadQrCode() {
      try {
        const plate = this.isPlateDisabled ? '' : this.vehiclePlate;

        if (!this.vehicleType) {
          await this.showToast('Selecciona el tipo de vehículo', 'danger');
          return;
        }

        // Verifica si el usuario seleccionó "carro" o "moto" pero no ingresó la placa
        if ((this.vehicleType === 'carro' || this.vehicleType === 'moto') && !this.vehiclePlate) {
          await this.showToast('Debes ingresar la placa', 'danger');
          return;
        }

        // Genera el código QR si pasa todas las validaciones
        this.qrCode = await this.apiService.getQrCode(this.vehicleType, plate);
      } catch (error: any) {
        const errorMessage = error.error && error.error.message
          ? error.error.message
          : 'Error al cargar el código QR.';
        await this.showToast(errorMessage, 'danger');
        console.error('Error al cargar el código QR:', error);
      }
    }


    async showToast(message: string, color: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: color,
        position: 'bottom'
      });
      toast.present();
    }

    goBack() {
      this.navCtrl.back();
    }
  }
