import {User} from "../models";
import {IUser} from "../models/user-model"

import CrudRepository from "./crud-repository";

class UserRepository extends CrudRepository<IUser>{
  constructor() {
    super(User);
  }
}

export default UserRepository;