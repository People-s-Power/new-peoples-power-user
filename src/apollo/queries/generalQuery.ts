import { gql } from "@apollo/client";

export const GET_ALL = gql
` query{
    general {
        adverts{
        _id
        caption
        message
        email
        duration
        link
        action
        audience
        image
        shares
        likes
        authorId
        author {
          _id
          email
          image
          name
      }
        createdAt
        updatedAt
        }

        victories{
            body
        authorId
        image
        likes
        shares
        updatedAt
        createdAt
        author{
            _id
            email
            image
            name
        }
        }
      
      petitions{
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
      
      posts{
        _id
        body
        createdAt
        comments {
            author
            body
        }
        image
        likes
        shares
        
        author {
            name
            email
            image
            _id
        }
        isPetition
      }
      
      events {
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
      
      victories {
        _id
        body
        authorId
        image
        likes
        shares
        updatedAt
        createdAt
        author{
            _id
            email
            image
            name
        }
      }
    }
}
`


export const GET_ALL_USERS = gql
`query{
    getUsers{
      id
      name
      accountType
      image
      email
      isActive
      country
      state
      phone
      address
    }
}`


export const FOLLOW = gql
`mutation follow($followerId: ID!, $followId: ID!){
    follow(followerId: $followerId, followId: $followId)
}`