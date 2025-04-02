import {Component, OnInit}                  from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router}             from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {AuthService}  from '../../shared/services/auth.service'

import {User}         from '../../shared/models/user.models';
import {Message}      from '../../shared/models/message.model';


@Component({
  selector: 'abc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  message!: Message;

  constructor(
    private _usersService : UsersService,
    private _authService : AuthService,
    private _router: Router,
    private _route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this.message = new Message('danger', '')

    this._route.queryParams.subscribe((params)  => {
      if (params['nowCanLogin']) {
          console.log('few', params);
        this.showMessage('Тепер ви можете зайти в систему', 'success');
      }
    })

    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  private showMessage(text: string, type: string = 'danger')
  {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {

    const formData = this.form.value;

    this._usersService.getUserByEmail(formData.email)
      .subscribe((user: User | undefined) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this._authService.login()
            this._router.navigate(['/core', 'bill']);
          }
          else {
            this.showMessage('Пароль не правильний');
          }
        } else {
            this.showMessage('Користувача не знайдено');
        }
      });
  }
}
