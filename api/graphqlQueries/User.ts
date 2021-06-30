import gql from "graphql-tag";

export const INSERT_USERS = gql`
    mutation insertUser($uuid: String!, $email: String!, $username: String!) {
        insert_users(objects: {uuid: $uuid, email: $email, username: $username}){
            users {
                uuid
                username
                email
                createdAt
            }
        }
    }
`