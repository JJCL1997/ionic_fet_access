import { Component, OnInit, OnDestroy } from '@angular/core';
import { QrService } from 'src/app/services/qr.service';
import { ToastController, NavController } from '@ionic/angular';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  private html5QrCodeScanner: Html5QrcodeScanner | null = null;
  userInfo: any = null;
  private scannedSuccessfully: boolean = false;
  private lastToken: string | null = null; // Para almacenar el último token escaneado

  constructor(
    private qrService: QrService,
    private toastController: ToastController,
    private navCtrl: NavController
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
    if (this.scannedSuccessfully) {
      console.warn("Ya se ha escaneado un QR con éxito, ignorando este escaneo.");
      return; // No hacer nada si ya se ha escaneado
    }

    let qrData;
    try {
      console.log("Texto escaneado:", decodedText);
      qrData = JSON.parse(decodedText);
    } catch (parseError) {
      console.error("El QR escaneado no tiene un formato JSON válido:", parseError);
      await this.showToast("El código QR no es válido.");
      return;
    }

    // Comprobar si el token ya fue utilizado
    if (this.lastToken === qrData.token) {
      console.warn("Este token ya ha sido utilizado.");
      await this.showToast('Este código QR ya ha sido escaneado.');
      return; // Evita que se use el mismo token
    }

    try {
      const validationResponse = await this.qrService.validateQrCode(
        qrData.token,
        qrData.email,
        qrData.vehiculo,
        qrData.placa
      );

      if (validationResponse.message.includes('autorizado')) {
        console.log("Código QR válido. Usuario autorizado.");
        this.userInfo = {
          nombre: qrData.nombre,
          codigo: qrData.codigo,
          email: qrData.email,
          vehicleType: qrData.vehiculo,
          vehiclePlate: qrData.placa,
        };
        this.scannedSuccessfully = true; // Marcar como escaneado con éxito
        this.lastToken = qrData.token; // Almacenar el token actual
        await this.showToast('Usuario autorizado.', 'success');
        this.stopQrScanner(); // Detener el escáner
      } else {
        console.warn("Código QR no válido o expirado.");
        this.userInfo = null;
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

  goBack() {
    this.navCtrl.back();
  }
}
