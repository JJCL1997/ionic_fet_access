import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-qr-visitor',
    templateUrl: './qr-visitor.page.html',
    styleUrls: ['./qr-visitor.page.scss'],
})
export class QrVisitorPage implements OnInit {
    qrCodeImage: string | null = null;

    constructor(private apiService: ApiService, private router : Router ) {}

    async ngOnInit() {
        await this.loadQrCode();
    }

    async loadQrCode() {
        try {
            const response = await this.apiService.getVisitorQrCode();
            this.qrCodeImage = response.qr_code; // Asigna el código QR en base64
        } catch (error) {
            console.error('Error al cargar el código QR:', error);
        }
    }

    goBack() {
      this.router.navigate(['/home-vigilant']);
    }
}
