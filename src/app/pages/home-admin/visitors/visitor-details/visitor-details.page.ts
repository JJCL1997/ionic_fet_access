import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.page.html',
  styleUrls: ['./visitor-details.page.scss'],
})
export class VisitorDetailsPage implements OnInit {
  visitor: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVisitorDetails();
  }

  async loadVisitorDetails() {
    const visitorId = this.route.snapshot.paramMap.get('id');
    if (visitorId) {
      try {
        this.visitor = await this.apiService.getVisitorById(visitorId);
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al cargar detalles del visitante',
          duration: 2000,
          color: 'danger',
          position: 'bottom',
        });
        toast.present();
        this.router.navigate(['/visitors']);
      }
    }
  }

  goBack() {
    this.router.navigate(['/visitors']);
  }
}
