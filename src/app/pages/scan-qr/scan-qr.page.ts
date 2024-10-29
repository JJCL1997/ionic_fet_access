import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  private html5QrCodeScanner: Html5QrcodeScanner | null = null;

  ngOnInit() {
    this.startQrScanner();
  }

  ngOnDestroy() {
    this.stopQrScanner();
  }

  startQrScanner() {
    this.html5QrCodeScanner = new Html5QrcodeScanner(
      "qr-reader", // ID del contenedor en el HTML
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false // Valor de `verbose`, pon `true` si quieres mensajes de depuración
    );
  
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

  onScanSuccess(decodedText: string) {
    const qrData = JSON.parse(decodedText); // Procesa los datos JSON del QR, si el contenido está en ese formato
    console.log("Datos escaneados:", qrData);

    // Aquí puedes llamar a la API de validación para verificar el código QR en el backend
    // Ejemplo: this.apiService.validateQrCode(qrData);
  }
}
