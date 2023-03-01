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

export const CREATE_EVENT = gql`
	mutation createEvent($name: String!, $description: String!, $endDate: String!, $startDate: String!, $time: String!, $type: String!, $imageFile: String!) {
		createEvent(name: $name, description: $description, endDate: $endDate, startDate: $startDate, time: $time, type: $type, imageFile: $imageFile) {
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

export const MY_EVENT = gql`
	query authorEvents($authorId: ID!, $page: Int!, $limit: Int!) {
		authorEvents(authorId: $authorId, page: $page, limit: $limit) {
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
