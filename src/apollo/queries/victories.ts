import { gql } from "@apollo/client"

export const MY_VICTORIES = gql`
	query myVictories($authorId: ID!) {
		myVictories(authorId: $authorId) {
			_id
			body
			image
			likes {
				name
				_id
			}
			__typename
			shares
			updatedAt
			createdAt
			author {
				_id
				email
				image
				name
			}
			comments {
				content
				_id
				author {
					_id
					name
					email
					image
				}
				date
				likes
			}
		}
	}
`
export const CREATE_VICTORIES = gql`
	mutation createVictory($authorId: ID!, $body: String!, $imageFile: [String!]!) {
		createVictory(authorId: $authorId, body: $body, imageFile: $imageFile) {
			_id
			body
		}
	}
`
