import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Professional } from '../../models/professional.model';
import { ProfessionalService } from '../../services/professional.service';

@Component({
  selector: 'app-professional-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professional-form.html', // Verificá si lleva '.component' en tu proyecto
  styleUrl: './professional-form.css', // Verificá si lleva '.component' en tu proyecto
})
export class ProfessionalFormComponent implements OnInit {
  professionals: Professional[] = [];

  newProfessional: Professional = {
    id: 0,
    firstName: '',
    lastName: '',
    license: '',
    specialty: '',
  };

  constructor(private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.loadProfessionals();
  }

  loadProfessionals() {
    this.professionals = this.professionalService.getProfessionals();
  }

  saveProfessional() {
    // Validamos campos obligatorios
    if (
      !this.newProfessional.firstName ||
      !this.newProfessional.lastName ||
      !this.newProfessional.license ||
      !this.newProfessional.specialty
    ) {
      alert('Por favor, completa Nombre, Apellido, Matrícula y Especialidad.');
      return;
    }

    this.professionalService.addProfessional({ ...this.newProfessional });
    alert('Profesional registrado con éxito');

    this.resetForm();
    this.loadProfessionals(); // Recargamos la lista para que aparezca en la tabla
  }

  private resetForm() {
    this.newProfessional = {
      id: 0,
      firstName: '',
      lastName: '',
      license: '',
      specialty: '',
    };
  }
}
