import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {
  qrCode: string | null = null;

  constructor(private apiService: ApiService, private navCtrl: NavController) {}

  async ngOnInit() {
    try {
      await this.loadQrCode();
    } catch (error) {
      console.error('Error al obtener el código QR:', error);
    }
  }

  async loadQrCode() {
    try {
      this.qrCode = await this.apiService.getQrCode();
    } catch (error) {
      console.error('Error al cargar el código QR:', error);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/home-student'); // Navega a la página de home-student
  }
}
