import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment'; // Importamos el servicio de turnos

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments-list.html',
  styleUrl: './appointments-list.css',
})
export class AppointmentsListComponent implements OnInit {
  // Ahora manejamos una lista de turnos, no de pacientes sueltos
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    // Le pedimos al servicio de turnos que nos traiga la agenda
    this.appointments = this.appointmentService.getAppointments();

    // Tip PRO: Ordenamos los turnos para que el más próximo aparezca primero
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
  }
}
