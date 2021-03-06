import {Router} from "express";
import * as expressRestResource from "express-rest-generator";
import * as Datastore from "nedb";
import User from "../src/domain/User";

export default class UserService {
  private readonly userRepository: Router;
  private readonly userDatabase: Datastore;

  constructor() {
    this.userDatabase = new Datastore();
    this.userRepository = expressRestResource({db: this.userDatabase});
  }

  public getUserRepository(): Router {
    return this.userRepository;
  }

  public save(user: User): void {
    this.userDatabase.insert(user);
  }

  // TODO rename -> reset/clean/deleteAll
  public delete(): void {
    this.userDatabase.remove({}, {multi: true});
  }

  public async findByUsername(username: string): Promise<User> {
    // nedb uses callback instead of promises, wrap findOne and return Promise
    return new Promise<User>((resolve) => {
      this.userDatabase.findOne({username}, (err, doc) => {
        resolve(doc as User);
      });
    });
  }
}
