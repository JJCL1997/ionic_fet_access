import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ApiService } from 'src/app/services/api.service';
import { ToastController ,NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  private html5QrCodeScanner: Html5QrcodeScanner | null = null;
  userInfo: any = null; // Almacena la información del usuario después del escaneo

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router,
    private navCtrl : NavController
  ) {}

  ngOnInit() {
    this.startQrScanner();
  }

  ngOnDestroy() {
    this.stopQrScanner();
  }

  startQrScanner() {
    if (!this.html5QrCodeScanner) {
      this.html5QrCodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
    }

    this.html5QrCodeScanner.render(
      (decodedText: string) => this.onScanSuccess(decodedText),
      (errorMessage: string) => {
        console.warn("QR no detectado:", errorMessage);
      }
    );
  }

  stopQrScanner() {
    if (this.html5QrCodeScanner) {
      this.html5QrCodeScanner.clear();
      this.html5QrCodeScanner = null;
    }
  }

  async onScanSuccess(decodedText: string) {
    try {
      console.log("Texto escaneado:", decodedText);

      let qrData;
      try {
        qrData = JSON.parse(decodedText);
      } catch (parseError) {
        console.error("El QR escaneado no tiene un formato JSON válido:", parseError);
        await this.showToast("El código QR no es válido.");
        return;
      }

      if (!qrData.token || !qrData.email) {
        console.warn("El QR escaneado no contiene los datos requeridos.");
        await this.showToast("El código QR escaneado no contiene datos válidos.");
        return;
      }

      const validationResponse = await this.apiService.validateQrCode(qrData.token, qrData.email);

      if (validationResponse.message === 'Usuario autorizado.') {
        console.log("Código QR válido. Usuario autorizado.");
        
        // Almacenar la información del usuario para mostrarla en la página
        this.userInfo = {
          nombre: validationResponse.user.nombres + " " + validationResponse.user.apellidos,
          codigo: validationResponse.user.codigo,
          email: validationResponse.user.email,
          vehicleType: validationResponse.vehicleType,
          vehiclePlate: validationResponse.vehiclePlate,
        };

        await this.showToast('Usuario autorizado.', 'success');
      } else {
        console.warn("Código QR no válido o expirado.");
        this.userInfo = null; // Limpia la información si el QR es inválido
        await this.showToast('Código QR no válido o expirado.');
      }
    } catch (error) {
      console.error("Error al procesar o validar el QR:", error);
      await this.showToast('Error al procesar el QR.');
    }
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
    });
    toast.present();
  }
  goBack(){
    this.navCtrl.back()
  }
}
