import { gql } from "@apollo/client";

export const GET_EVENTS = gql
  `query events{
    events{
        _id
        audience
        authorId
        author{
            _id
            name
            email
            image
        }
        description
        startDate
        endDate
        time
        image
        interested {
            authorId
            authorImg
            name
        }
        likes
        name
        shares
        type
    }
}`


export const CREATE_EVENT = gql
  `mutation createEvent($name: String!, $description: String!, $endDate: String!, $startDate: String!, $time: String!, $type: String!, $imageFile: String!){
    createEvent (name: $name, description: $description, endDate: $endDate, startDate: $startDate, time: $time, type: $type, imageFile: $imageFile){
        _id
        audience
        authorId
        author{
            _id
            name
            email
            image
        }
        description
        startDate
        endDate
        time
        image
        interested {
            authorId
            authorImg
            name
        }
        likes
        name
        shares
        type
    }
}`
