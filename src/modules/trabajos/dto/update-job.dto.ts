export class CreateJobDto {
  employerId: number;
  title: string;
  description: string;
  // image?: string;
}

export class UpdateJobDto extends CreateJobDto {
  // Puedes agregar campos opcionales o específicos para la actualización aquí si es necesario
}