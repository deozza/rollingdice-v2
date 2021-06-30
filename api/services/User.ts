
import type {User as UserEntity} from "../entities/User";
import {Error} from "../utils/useCaseResult/types/Error";
import {INSERT_USERS} from "../graphqlQueries/User";



export class User {

    public async addUserToFirebase(user: UserEntity) {

    }

    public async addUserToHasura(user: UserEntity){

    }
}
