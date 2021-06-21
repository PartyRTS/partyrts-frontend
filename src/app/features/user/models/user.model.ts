export interface User {
  idUser: number;
  email: string;
  firstName: string;
  secondName: string;
  logoUrl: string;
  registrationDate: Date;
  birthdayDate: Date;
  description: string;
  banned: boolean;
}
