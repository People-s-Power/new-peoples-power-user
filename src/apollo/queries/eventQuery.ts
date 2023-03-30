import { gql } from "@apollo/client"

export const GET_EVENTS = gql`
	query events {
		events {
			_id
			audience
			authorId
			author {
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
	}
`

export const UPDATE_EVENT = gql`
	mutation updateEvent(
		$authorId: ID!
		$eventId: ID!
		$name: String!
		$description: String!
		$endDate: String!
		$startDate: String!
		$time: String!
		$type: String!
		$imageFile: [String!]!
	) {
		updateEvent(
			name: $name
			description: $description
			endDate: $endDate
			startDate: $startDate
			time: $time
			type: $type
			imageFile: $imageFile
			authorId: $authorId
			eventId: $eventId
		) {
			_id
			audience
			author {
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
				name
			}
			name
			type
		}
	}
`

export const CREATE_EVENT = gql`
	mutation createEvent(
		$author: ID!
		$audience: String!
		$name: String!
		$description: String!
		$endDate: String!
		$startDate: String!
		$time: String!
		$type: String!
		$imageFile: [String!]!
	) {
		createEvent(
			name: $name
			description: $description
			endDate: $endDate
			startDate: $startDate
			time: $time
			type: $type
			imageFile: $imageFile
			audience: $audience
			author: $author
		) {
			_id
			audience
			author {
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
				name
			}
			name
			type
		}
	}
`

export const MY_EVENT = gql`
	query authorEvents($authorId: ID!) {
		authorEvents(authorId: $authorId) {
			_id
			audience
			author {
				_id
				name
				email
				image
			}
			description
			startDate
			endDate
			createdAt
			__typename
			time
			image
			name
			likes {
				name
			}
			interested {
				authorId
				authorImg
				name
			}
			name
			type
		}
	}
`

export const INTERESTED = gql`
	mutation interested($eventId: String!, $authorId: ID!, $authorImg: String!, $name: String!) {
		interested(eventId: $eventId, authorId: $authorId, authorImg: $authorImg, name: $name) {
			_id
			name
			description
			time
			image
			type
			audience
			startDate
			comments {
				_id
				content
				author {
					_id
					name
					email
					image
				}
				date
				likes
			}
			endDate
			interested {
				authorId
				authorImg
				name
			}
			shares
			likes {
				_id
				name
				email
				image
			}
			createdAt
			updatedAt
			author {
				_id
				name
				email
				image
			}
			promoted
		}
	}
`
