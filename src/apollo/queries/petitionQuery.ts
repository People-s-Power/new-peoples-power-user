import gql from "graphql-tag"

export const GET_PETITION = gql`
	query getPetitions {
		getPetitions {
				aim
				addedFrom
				author {
					_id
					name
					email
					description
					image
				}
				body
				category
				createdAt
				__typename
				endorsements {
					body
				}
				excerpt
				_id
				image
				likes {
					_id
					name
					email
					image
				}
				comments {
					_id
					content
					author {
						_id
						name
						image
					}
					date
				}
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

export const GET_ACTIVE_PETITION = gql`
	query getActivePetitions {
		getActivePetitions {
			aim
			addedFrom
			authorId
			authorImg
			authorName
			body
			category
			createdAt
			endorsements {
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

export const MY_PETITION = gql`
	query myPetition {
		myPetition {
			aim
			addedFrom
			authorId
			authorImg
			authorName
			body
			category
			createdAt
			endorsements {
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
export const SINGLE_PETITION = gql`
	query getPetition($slug: String!) {
		getPetition(slug: $slug) {
			title
			_id
			image
			excerpt
			aim
			target
			body
			slug
			status
			createdAt
			updatedAt
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
			addedFrom
			numberOfPaidViewsCount
			numberOfPaidEndorsementCount
			endorsements {
				id
				author {
					name
					id
				}
				petition {
					_id
					title
					image
					excerpt
					aim
					target
					createdAt
				}
				body
				likes {
					name
					_id
					image
					email
				}
				createdAt
				updatedAt
			}
			promoted
			likes {
				_id
				name
				email
				image
			}
			views
			category
			region
			author {
				_id
				name
				email
				image
			}
			updates {
				body
				image
				author {
					_id
					name
					email
					image
				}
				shares
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
				}
				likes {
					name
					_id
					image
				}
			}
		}
	}
`
