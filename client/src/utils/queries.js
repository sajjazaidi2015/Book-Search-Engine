import { gql } from '@apollo/client';

// me query for login 
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            savedBooks {
                bookId
                authors
                description
                title 
                image
            }
        }
    } 
`;