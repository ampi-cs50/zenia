export interface Professional {
  id: number;
  firstName: string;
  lastName: string;
  license: string; // Matrícula profesional
  specialty: string; // Especialidad (ej: Cardiología, Pediatría)
  phone?: string; // Opcional
}
