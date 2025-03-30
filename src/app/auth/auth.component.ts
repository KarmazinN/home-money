import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'abc-auth',
  templateUrl: './app.component.html',
  standalone: false
})

export class AuthComponent implements OnInit {
constructor(private _router: Router) {}

  ngOnInit() {
    this._router.navigate(['login']);
  }
}
