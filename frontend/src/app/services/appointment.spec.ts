import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root', // Esto le dice a Angular cómo "inyectarlo" automáticamente
})
export class AppointmentService {
  private storageKey = 'zenia_appointments';

  constructor() {}

  getAppointments(): Appointment[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addAppointment(appointment: Appointment) {
    const appointments = this.getAppointments();
    appointment.id =
      appointments.length > 0 ? Math.max(...appointments.map((a) => a.id || 0)) + 1 : 1;
    appointment.status = 'pending';
    appointments.push({ ...appointment });
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }
}
