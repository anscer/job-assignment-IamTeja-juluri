import {Token} from "../models";
import { IToken } from "../models/token-model";
import CrudRepository from "./crud-repository";

class TokenRepository extends CrudRepository<IToken>{
  constructor() {
    super(Token);
  }
}

export default TokenRepository;