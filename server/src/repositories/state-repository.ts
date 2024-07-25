import {State} from "../models";
import { IState } from "../models/states-model";
import CrudRepository from "./crud-repository";

class StateRepository extends CrudRepository<IState>{
  constructor() {
    super(State);
  }
}

export default StateRepository;