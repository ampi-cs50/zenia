import { Injectable } from '@angular/core';
import { Professional } from '../models/professional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private professionals: Professional[] = [];

  constructor() {
    // Al arrancar, levantamos los médicos que ya estaban guardados
    const savedDocs = localStorage.getItem('professionals');
    if (savedDocs) {
      this.professionals = JSON.parse(savedDocs);
    }
  }

  // Guardar un nuevo profesional
  addProfessional(prof: Professional) {
    prof.id = Date.now(); // ID único e irrepetible
    this.professionals.push({ ...prof });

    // Guardamos en el disco del navegador
    localStorage.setItem('professionals', JSON.stringify(this.professionals));
    console.log('Servicio: Profesional guardado', this.professionals);
  }

  // Obtener la lista completa de médicos
  getProfessionals(): Professional[] {
    return this.professionals;
  }
}
