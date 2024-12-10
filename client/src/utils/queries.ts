import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            jobCount
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
                applied
            }
        }
    }`;






