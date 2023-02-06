import { gql } from "@apollo/client";

export const GET_ALL = gql
` mutation timeline($authorId: ID!){
      timeline(authorId: $authorId){
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
          likes
          authorId
          __typename
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
          __typename
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
          __typename
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
          __typename
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
          __typename
          time
          image
          name
          interested {
              authorId
              authorImg
              name
          }
          likes
          name
          type
        }
        
        victories {
          _id
          body
          authorId
          image
          likes
          shares
          __typename
          updatedAt
          createdAt
          author{
              _id
              email
              image
              name
          }
        }
        updates{
          petition{
            id
            title
            image
            slug
            authorId
            authorName
            authorImg
          }
          body
          image
          authorId
          likes
          shares
          __typename
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

export const CONNECTIONS = gql
`mutation connections{
  connections{
    name
    image
    _id
  }
}`


export const FOLLOW = gql
`mutation follow($followerId: ID!, $followId: ID!){
    follow(followerId: $followerId, followId: $followId)
}`

export const UNFOLLOW = gql
`mutation follow($followerId: ID!, $unfollowId: ID!){
    follow(followerId: $followerId, unfollowId: $unfollowId)
}`


export const LIKE = gql
`mutation like($authorId: ID!, $itemId: ID!){
  like(authorId: $authorId, itemId: $itemId)
}`

export const SHARE = gql
`mutation share($authorId: ID!, $itemId: ID!){
  share(authorId: $authorId, itemId: $itemId)
  {
    posts{
      _id
      body
    }
    adverts{
      _id
      message
    }
    petitions{
      id
      title
    }
    events{
      _id
      name
    }
    victories{
      _id
      body
    }
  }
}`

// export const UNLIKE = gql
// `mutation like($authorId: ID!, $itemId: ID!){
//   like(authorId: $authorId, itemId: $itemId)
// }`

