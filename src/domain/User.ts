export default class User {
  public "_id"?: string;
  public username: string;
  public email: string;
  public index: number;
  public password: string;

  constructor() {
    this.username = "";
    this.index = 0;
    this.email = "";
    this.password = "";
  }
}
