import { gql } from "@apollo/client"

export const UPDATE_ADVERT = gql`
	mutation updateAd(
		$authorId: ID!
		$caption: String!
		$message: String!
		$action: String!
		$audience: String!
		$duration: String!
		$email: String!
		$link: String!
		$imageFile: [String!]!
		$advertId: ID!
	) {
		updateAd(
			authorId: $authorId
			caption: $caption
			imageFile: $imageFile
			message: $message
			action: $action
			audience: $audience
			duration: $duration
			email: $email
			link: $link
			advertId: $advertId
		) {
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
			createdAt
			updatedAt
		}
	}
`
export const CREATE_ADVERT = gql`
	mutation createdAd(
		$author: ID!
		$caption: String!
		$message: String!
		$action: String!
		$audience: String!
		$duration: String!
		$email: String!
		$link: String!
		$imageFile: [String!]!
	) {
		createdAd(
			author: $author
			caption: $caption
			imageFile: $imageFile
			message: $message
			action: $action
			audience: $audience
			duration: $duration
			email: $email
			link: $link
		) {
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
			createdAt
			updatedAt
		}
	}
`
export const MY_ADVERTS = gql`
	query myAdverts($authorId: ID!) {
		myAdverts(authorId: $authorId) {
			_id
			caption
			message
			email
			duration
			link
			action
			audience
			image
			likes {
				name
			}
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
	}
`
export const ADVERT = gql`
	query advert($advertId: ID!) {
		advert(advertId: $advertId) {
			_id
			caption
			message
			email
			duration
			link
			action
			audience
			image
			likes {
				name
			}
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
	}
`
