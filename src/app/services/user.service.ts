import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  updateUserProfile(profile: any) {
    this.userProfileSubject.next(profile);
  }
}
