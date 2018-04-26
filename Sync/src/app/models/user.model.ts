export interface User {
  _id: string;
  name: string;
  last: string;
  username: string;
  email: string;
  // password: string;
  role: string;
  shift: [{
    name: string;
    venue: string,
    date: Date,
    time: string
  }]

}
