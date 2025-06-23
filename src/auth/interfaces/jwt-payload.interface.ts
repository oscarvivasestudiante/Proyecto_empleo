export interface JwtPayload {
  id: number;
  roles: string[]; // o string
  name: string;
  email: string;
}
