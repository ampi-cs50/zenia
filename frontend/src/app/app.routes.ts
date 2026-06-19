import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { PatientFormComponent } from './components/patient-form/patient-form';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-patient', component: PatientFormComponent },
  { path: 'appointments', component: AppointmentsListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
