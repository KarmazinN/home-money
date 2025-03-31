import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/models/user.models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'abc-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: false
})
export class RegistrationComponent {

  form!: FormGroup;

  constructor(
      private _usersService : UsersService,
      private _router: Router,
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmails()]
      ),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, Validators.required),
      'agree': new FormControl(false, Validators.requiredTrue),
    })
  }


  onSubmit() {
    const formData = this.form.value;
    const user = new User(formData.email, formData.password, formData.name);

    this._usersService.createNewUser(user)
      .subscribe(() => {
        this._router.navigate(['/login'], {
          queryParams: {
            email: user.email,
            nowCanLogin: true
          },
        });
      });
  }

  forbiddenEmails(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this._usersService.getUserByEmail(control.value).pipe(
          map((user: User | undefined) => {
            return user ? {forbiddenEmail: true} : null;
          })
      );
    };
  }
}
