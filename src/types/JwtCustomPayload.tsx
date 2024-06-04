export interface JwtCustomPayload {
  aud: string;
  email: string;
  exp: number;
  firstname: string;
  iss: string;
  lastname: string;
  middlename: string;
  nameid: string;
  role: string[];
  userclaim: string[];
}
