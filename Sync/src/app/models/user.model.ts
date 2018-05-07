export interface User {
  _id: string;
  name: string;
  last: string;
  username: string;
  email: string;
  // password: string;
  role: string;
  availability: [{Date}];

}
