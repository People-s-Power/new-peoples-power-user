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
