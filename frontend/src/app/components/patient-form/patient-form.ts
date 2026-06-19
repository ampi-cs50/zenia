import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientFormComponent implements OnInit {
  patients: Patient[] = [];

  newPatient: Patient = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    healthInsurance: '',
  };

  constructor(private patientService: PatientService) {}

  // Se ejecuta al cargar el componente
  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = this.patientService.getPatients();
  }

  savePatient() {
    if (!this.newPatient.firstName || !this.newPatient.lastName || !this.newPatient.dni) {
      alert('Por favor, completa Nombre, Apellido y DNI.');
      return;
    }

    this.patientService.addPatient({ ...this.newPatient });
    alert('Paciente registrado con éxito');

    this.resetForm();
    this.loadPatients();
  }

  private resetForm() {
    this.newPatient = {
      id: 0,
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      phone: '',
      healthInsurance: '',
    };
  }
}
