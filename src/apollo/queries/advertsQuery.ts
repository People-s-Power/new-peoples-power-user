import { gql } from "@apollo/client";

export const CREATE_ADVERT = gql`
mutation createdAd($caption: String!, $message: String!, $action: String!, $audience: String!, $duration: String!, $email: String!, $link: String!, $imageFile: String!,) {
    createdAd(caption: $caption, imageFile: $imageFile, message: $message, action: $action, audience: $audience, duration: $duration, email: $email, link: $link) {
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
}
`