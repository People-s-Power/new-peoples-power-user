import gql from "graphql-tag";

export const CREATE_ORG = gql
  ` mutation createOrg($CreateOrgInput: CreateOrgInput!){
    createOrg(input: $CreateOrgInput) {
        name
        email
        phone
        website
        description
    }
  }
`;

export const UPDATE_ORG = gql
  ` mutation updateOrganization ($UpdateInput: UpdateInput!){
    updateOrganization (input: $UpdateInput) {
        name
        email
        phone
        website
        description
    }
  }
`;

export const GET_ORGANIZATIONS = gql
  `query getUserOrganizations($ID: ID!){
    getUserOrganizations(id: $ID){
       _id
      image
      author
      name
      email
      description
      phone
      followers
      following
      followers
      following
      operators {
          role
      }
      facebook
      linkedIn
      instagram
      twitter
      country
      city
      website
    }
  }`

export const GET_ORGANIZATION = gql
  `query getOrganzation($ID: ID!){
    getOrganzation(id: $ID) {
        _id
    image
    author
    name
    email
    description
    phone
    followers
    following
    followers
    following
    operators {
        role
        userId
    }
    facebook
    linkedIn
    instagram
    twitter
    country
    city
    website
    }
}`

export const ADD_OPERATOR = gql
  `mutation addOperator($CreateOperator: CreateOperator!) {
    addOperator(input: $CreateOperator){
      image
      operators{
          role
          userId
        }
  }
}
`
export const DELETE_OPERATOR = gql
  `mutation deleteOperator ($DeleteOperator: DeleteOperator!) {
    deleteOperator(input: $DeleteOperator){
      image
        operators{
            role
            userId
        }
      }
    }
  `