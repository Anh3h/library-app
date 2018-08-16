import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ApiService } from './service/api.service';
import { AppRoutingModule } from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeGridComponent } from './components/home-grid/home-grid.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { BooksComponent } from './components/books/books.component';
import { SnackBarComponent } from './components/template/snack-bar/snack-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HomeGridComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ViewBookComponent,
    BooksComponent,
    SnackBarComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
