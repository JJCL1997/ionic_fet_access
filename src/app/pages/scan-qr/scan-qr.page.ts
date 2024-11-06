import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ApiService } from '../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  private html5QrCodeScanner: Html5QrcodeScanner | null = null;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.startQrScanner();
  }

  ngOnDestroy() {
    this.stopQrScanner();
  }

  startQrScanner() {
    if (!this.html5QrCodeScanner) {  // Solo iniciar si no existe una instancia
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
      this.html5QrCodeScanner = null; // Liberar la instancia
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
        return;
      }

      if (!qrData.token || !qrData.email || !qrData.nombre || !qrData.codigo) {
        console.warn("El QR escaneado no contiene los datos requeridos.");
        return;
      }

      console.log("Datos escaneados:", qrData);

      // Mostrar la información del usuario contenida en el QR
      const userInfoToast = await this.toastController.create({
        message: `Nombre: ${qrData.nombre}, Código: ${qrData.codigo}, Email: ${qrData.email}`,
        duration: 4000,
        color: 'primary',
      });
      await userInfoToast.present();

      // Llama a la API de validación para verificar el código QR en el backend
      const validationResponse = await this.apiService.validateQrCode(qrData.token, qrData.email);

      if (validationResponse.message === 'Usuario autorizado.') {
        console.log("Código QR válido. Usuario autorizado.");

        // Mostrar mensaje de éxito
        const successToast = await this.toastController.create({
          message: 'Usuario autorizado.',
          duration: 2000,
          color: 'success',
        });
        await successToast.present();

        // Esperar unos milisegundos después del Toast para redirigir
        setTimeout(() => {
          this.stopQrScanner(); // Detiene el escáner antes de redirigir
          this.router.navigate(['/home-vigilant']); // Redirige a '/home-vigilant'
        }, 500); // Espera 500 ms antes de redirigir
      }
       else {
        console.warn("Código QR no válido o expirado.");
      }
    } catch (error) {
      console.error("Error al procesar o validar el QR:", error);
    }
  }
}
