import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('AdminUsersPage cargado');
  }

  viewUsers() {
    this.router.navigate(['/view-users']);
  }

  deleteUser() {
    this.router.navigate(['/delete-user']);
  }

  registerUser() {
    this.router.navigate(['/register-user']);
  }

  goBack() {
    this.router.navigate(['/home-admin']);
  }
}
