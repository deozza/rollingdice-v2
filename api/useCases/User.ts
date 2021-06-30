import type BaseInputModele from "../../components/atoms/input/BaseInputModel";
import {User as UserEntity, ValidationStates} from "../entities/User";
import {User as UserService} from "../services/User";
import {Result} from "../utils/useCaseResult/Result";
import {Error} from "../utils/useCaseResult/types/Error";

export class User {


    public register(inputs: Array<BaseInputModele>, client): Result{
        let result: Result = new Result()

        let user = new UserEntity()
        user.createUser(inputs)

        result.content = user

        result.errors = user.validateProperties(ValidationStates.register)

        if(result.isFailed()){
            return result
        }

        const userService: UserService = new UserService()
        /*
        const [userAfterUpdatedByFirebase, errorFromFirebase] = userService.addUserToFirebase(user)

        console.log(errorFromFirebase)

        if(errorFromFirebase !== null){
            result.errors.push(errorFromFirebase)
            return result
        }

        result.content = userAfterUpdatedByFirebase
        */
        userService.addUserToHasura(user)

        return result
    }

    public getPrivateProfile(){

    }

    public getPublicProfile(){

    }

    public listUsers(){

    }

    public updatePrivateProfile(){

    }

    public deletePrivateProfile(){

    }
}