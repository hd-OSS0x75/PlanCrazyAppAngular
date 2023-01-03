export interface AppUser {
  appUserId?: string; //id en optionnal
  nickname: string;
  firstName: string;
  lastName: string;
  address: string;
  postcode: number; //todo : number ou string ?
  city: string;
  phoneNumber: number; //todo : number ou string ?
  email: string;
  password: string;
}
