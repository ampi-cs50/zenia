import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';
import { PatientService } from '../../services/patient'; // Para traer los pacientes cargados
import { Patient } from '../../models/patient.model';
// 1. AGREGADO: Importamos el servicio y modelo de profesionales
import { ProfessionalService } from '../../services/professional.service';
import { Professional } from '../../models/professional.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.html', // <--- Verificá que coincida con tu archivo físico
  styleUrl: './appointment-form.css', // <--- Verificá que coincida con tu archivo físico
})
export class AppointmentFormComponent implements OnInit {
  patients: Patient[] = []; // El "balde" para el desplegable de pacientes
  // 2. AGREGADO: El "balde" para el desplegable de profesionales
  professionals: Professional[] = [];

  newAppointment: Appointment = {
    id: 0,
    patientId: 0,
    patientName: '',
    date: '',
    time: '',
    specialty: '',
    status: 'pending',
  };

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    // 3. AGREGADO: Inyectamos el servicio de profesionales
    private professionalService: ProfessionalService,
  ) {}

  ngOnInit(): void {
    // Apenas carga el formulario, se trae la lista de pacientes del servicio
    this.patients = this.patientService.getPatients();
    // 4. AGREGADO: Nos traemos también los profesionales guardados
    this.professionals = this.professionalService.getProfessionals();
  }

  saveAppointment() {
    // Validación básica
    if (!this.newAppointment.patientId || !this.newAppointment.date || !this.newAppointment.time) {
      alert('Por favor, completa paciente, fecha y hora.');
      return;
    }

    // Buscamos el nombre del paciente elegido para guardarlo directo en el turno
    const selectedPatient = this.patients.find(
      (p) => p.id === Number(this.newAppointment.patientId),
    );
    if (selectedPatient) {
      this.newAppointment.patientName = `${selectedPatient.lastName}, ${selectedPatient.firstName}`;
    }

    this.appointmentService.addAppointment({ ...this.newAppointment });
    alert('Turno agendado con éxito');
    this.resetForm();
  }

  private resetForm() {
    this.newAppointment = {
      id: 0,
      patientId: 0,
      patientName: '',
      date: '',
      time: '',
      specialty: '',
      status: 'pending',
    };
  }
}
