import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User} from '../models/user.models';
import { map } from 'rxjs/operators';


@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : undefined)
      );
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }
}
