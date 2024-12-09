import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const SAVE_JOB = gql`
    mutation SaveJob($input: jobInput!) {
        saveJob(input: $input) {
            savedJobs {
                jobId
                jobTitle
                content
                datePublished
                refs {
                    landingPage
                }
                levels {
                    name
                }
                locations {
                    name
                }
                company {
                    name
                }
            }
        }
    }
`;

export const REMOVE_JOB = gql`
    mutation RemoveJob($jobId: Int!) {
        removeJob(jobId: $jobId) {
            savedJobs {
                jobId
            }
        }
    }
`;