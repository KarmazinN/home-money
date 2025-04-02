import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';

import { AppComponent }     from './app.component';
import { AuthModule }       from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService}      from './shared/services/users.service';
import { HttpClientModule}  from '@angular/common/http';
import { AuthService}       from "./shared/services/auth.service";
import { CoreModule }       from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CoreModule
  ],
  providers: [
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
