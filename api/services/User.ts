import {onMount} from "svelte";

import type {User as UserEntity} from "../entities/User";
import {Error} from "../utils/useCaseResult/types/Error";
import {INSERT_USERS} from "../graphqlQueries/User";

import type firebase from "firebase";
import {auth} from "../../firebase";
import urql from "../../urql";

export class User {

    public async addUserToFirebase(user: UserEntity) {
        onMount(async () => {
            await auth.createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential: firebase.auth.UserCredential) => {
                    user.uid = userCredential.user.uid

                    return [user, null]
                }).catch((errorFromFirebase) => {
                    const error: Error = new Error(errorFromFirebase.code, errorFromFirebase.message)
                    return [user, error]
                })
        })
    }

    public async addUserToHasura(user: UserEntity){

        console.log('coucou')

        await urql
            .mutation(INSERT_USERS, {$uuid: user.uid, $email: user.email, $username: user.username, $password: user.password})
            .toPromise()
            .then((r: any) => {
                if(r.error){
                    console.log(r.error)
                }
            })

        /*
        try{
            await addUserToHasura({variables: {$uuid: user.uid, $email: user.email, $username: user.username, $password: user.password}})

            return [user, null]
        }catch (e){
            console.log(e)
            return [user, null]
        }

         */
    }
}