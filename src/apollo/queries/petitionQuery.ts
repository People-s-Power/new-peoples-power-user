import gql from "graphql-tag";

export const GET_PETITION = gql
`
query getPetitions  {
    getPetitions {
        aim
        addedFrom
        authorId
        authorImg
        authorName
        body
        category
        createdAt
        endorsements{
            body
        }
        excerpt
        id
        image
        likes
        numberOfPaidEndorsementCount
        numberOfPaidViewsCount
        promoted
        slug
        status
        target
        title
        updatedAt
        views
    }
}
`

export const GET_ACTIVE_PETITION = gql
`
query getActivePetitions  {
    getActivePetitions{
        aim
        addedFrom
        authorId
        authorImg
        authorName
        body
        category
        createdAt
        endorsements{
            body
        }
        excerpt
        id
        image
        likes
        numberOfPaidEndorsementCount
        numberOfPaidViewsCount
        promoted
        slug
        status
        target
        title
        updatedAt
        views
    }
}
`

export const MY_PETITION = gql
`
query myPetition{
    myPetition{
        aim 
        addedFrom
        authorId
        authorImg
        authorName
        body
        category
        createdAt
        endorsements{
            body
        }
        excerpt
        id
        image
        likes
        numberOfPaidEndorsementCount
        numberOfPaidViewsCount
        promoted
        slug
        status
        target
        title
        updatedAt
        views
    }
}
`
export const SINGLE_PETITION = gql
`
query getPetition ($slug: String!){
    getPetition(slug: $slug){
        aim 
        addedFrom
        authorId
        authorImg
        authorName
        body
        category
        createdAt
        endorsements{
            body
        }
        excerpt
        id
        image
        likes
        numberOfPaidEndorsementCount
        numberOfPaidViewsCount
        promoted
        slug
        status
        target
        title
        updatedAt
        views
    }
}
`