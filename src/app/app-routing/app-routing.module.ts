import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ViewBookComponent } from '../components/view-book/view-book.component';
import { BooksComponent } from '../components/books/books.component';
import { FavoriteBooksComponent } from '../components/favorite-books/favorite-books.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../components/edit-password/edit-password.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'books/:book_id/view', component: ViewBookComponent },
  { path: 'books', component: BooksComponent },
  { path: 'favorite-books', component: FavoriteBooksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'reset-password', component: EditPasswordComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
