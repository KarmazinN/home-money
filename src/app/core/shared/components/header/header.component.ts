import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user.models';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'abc-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user!: User;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    ) { }

  ngOnInit() {
    this.user = JSON.parse(<string>window.localStorage.getItem('user'));

  }

  onLogout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
