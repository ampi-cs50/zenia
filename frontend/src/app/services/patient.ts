import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];

  constructor() {
    // Apenas se crea el servicio, intentamos levantar los pacientes guardados previamente
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
    }
  }

  addPatient(patient: Patient) {
    // Generamos un ID único basado en el tiempo actual para evitar que se dupliquen IDs al borrar o recargar
    patient.id = Date.now();

    this.patients.push({ ...patient });

    // LA MAGIA: Guardamos la lista actualizada en el disco del navegador convirtiéndola a texto (JSON)
    localStorage.setItem('patients', JSON.stringify(this.patients));

    console.log('Servicio: Paciente guardado permanentemente', this.patients);
  }

  getPatients(): Patient[] {
    // Siempre devolvemos la lista actualizada
    return this.patients;
  }
}
