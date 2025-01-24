import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormDataService } from './services/form-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [FormDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
