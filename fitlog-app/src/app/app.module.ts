import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
          NgModule,
          NO_ERRORS_SCHEMA
        } from '@angular/core';
import {
          FormsModule,
          ReactiveFormsModule
        } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { HeaderComponent } from './header/header.component'
import { TrainingLogCreateComponent } from './training-logs/training-log-create/training-log-create.component';
import {
          TrainingLogDialogComponent,
          TrainingLogDialogModalComponent
       } from './training-logs/training-log-dialog/training-log-dialog.component';
import { TrainingLogDisplayComponent } from './training-logs/training-log-display/training-log-display.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    TrainingLogCreateComponent,
    TrainingLogDialogComponent,
    TrainingLogDialogModalComponent,
    TrainingLogDisplayComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
