import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-access-logs-details',
    templateUrl: './access-logs-details.page.html',
    styleUrls: ['./access-logs-details.page.scss'],
})
export class AccessLogsDetailsPage implements OnInit {
    logDetails: any;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}

    async ngOnInit() {
      const logIdParam = this.route.snapshot.paramMap.get('id');
      const logId = logIdParam ? +logIdParam : null;

      if (logId !== null) {
          await this.loadLogDetails(logId);
      } else {
          console.error("No se encontró el ID del log");
      }
  }


    async loadLogDetails(logId: number) {
        this.logDetails = await this.apiService.getAccessLogDetails(logId);
    }
}
