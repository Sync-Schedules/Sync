export interface User {
  _id: string;
  name: string;
  last: string;
  username: string;
  email: string;
  // password: string;
  role: string;

  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;

  shift: [{
    name: string;
    venue: string,
    date: Date,
    time: string
  }]

}
