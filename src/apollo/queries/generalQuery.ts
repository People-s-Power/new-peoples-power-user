import { gql } from "@apollo/client"

export const GET_ALL = gql`
	mutation timeline($authorId: ID!) {
		timeline(authorId: $authorId) {
			adverts {
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
				__typename
				shares
				author {
					_id
					email
					image
					description
					name
				}
				createdAt
				updatedAt
			}

			victories {
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
					description
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

			petitions {
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

			posts {
				_id
				body
				createdAt
				image
				likes {
					_id
					name
					email
					image
				}
				shares
				__typename
				author {
					name
					email
					image
					_id
					description
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
				isPetition
			}

			updates {
				body
				_id
				petition {
					_id
					title
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
						date
						likes
						author {
							_id
							name
							email
							image
						}
					}
					addedFrom
					numberOfPaidViewsCount
					numberOfPaidEndorsementCount
					endorsements {
						id
						body
						author {
							id
							name
							email
							image
						}
					}
					likes {
						_id
						name
						email
						image
					}
					promoted
					views
					comments {
						_id
						content
						date
						likes
						author {
							_id
							name
							email
							image
						}
					}

					category
					region
					author {
						_id
						name
						email
						image
					}
				}
				image
				comments {
					_id
					content
					date
					likes
					author {
						_id
						name
						email
						image
					}
				}
				likes {
					_id
					name
					email
					image
				}
				shares
				author {
					_id
					name
					description
					email
					image
				}
				__typename
			}

			events {
				_id
				audience
				author {
					_id
					name
					email
					image
					description
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
				shares
				description
				startDate
				endDate
				audience
				createdAt
				__typename
				time
				image
				name
				likes {
					name
				}
				
				
				type
			}
		}
	}
`

export const GET_ALL_USERS = gql`
	query {
		getUsers {
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
	}
`

export const CONNECTIONS = gql`
	mutation connections($authorId: ID!) {
		connections(authorId: $authorId) {
			name
			image
			_id
			followers
			description
		}
	}
`
export const FOLLOWERS = gql`
	query getUserFollowers($userId: String!) {
		getUserFollowers(userId: $userId) {
			name
			image
			_id
			followers
		}
	}
`
export const FOLLOWING = gql`
	query getUserFollowing($userId: String!) {
		getUserFollowing(userId: $userId) {
			name
			image
			_id
			followers
		}
	}
`

export const COMMENT = gql`
	mutation comment($authorId: ID!, $itemId: ID!, $content: String!) {
		comment(authorId: $authorId, itemId: $itemId, content: $content) {
			_id
			content
			author {
				_id
			}
			date
		}
	}
`

export const FOLLOW = gql`
	mutation follow($followerId: ID!, $followId: ID!) {
		follow(followerId: $followerId, followId: $followId)
	}
`

export const UNFOLLOW = gql`
	mutation follow($followerId: ID!, $unfollowId: ID!) {
		follow(followerId: $followerId, unfollowId: $unfollowId)
	}
`

export const LIKE = gql`
	mutation like($authorId: ID!, $itemId: ID!) {
		like(authorId: $authorId, itemId: $itemId)
	}
`

export const SHARE = gql`
	mutation share($authorId: ID!, $itemId: ID!) {
		share(authorId: $authorId, itemId: $itemId) {
			posts {
				_id
				body
			}
			adverts {
				_id
				message
			}
			petitions {
				_id
				title
			}
			events {
				_id
				name
			}
			victories {
				_id
				body
			}
		}
	}
`

export const VIEW = gql`
mutation view($authorId: ID!, $itemId: ID!){
  view(authorId: $authorId, itemId: $itemId)
}`

export const HIDE = gql`
mutation hideFor($authorId: ID!, $itemId: ID!){
  hideFor(authorId: $authorId, itemId: $itemId)
}`

export const UNHIDE = gql`
mutation unhide($authorId: ID!, $itemId: ID!){
  unhide(authorId: $authorId, itemId: $itemId)
}`

// export const UNLIKE = gql
// `mutation like($authorId: ID!, $itemId: ID!){
//   like(authorId: $authorId, itemId: $itemId)
// }`


export const UPDATES = gql`
	query getUpdate($id: ID!) {
		getUpdate(id: $id) {
			body
				_id
				petition {
					_id
					title
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
						date
						likes
						author {
							_id
							name
							email
							image
						}
					}
					addedFrom
					numberOfPaidViewsCount
					numberOfPaidEndorsementCount
					endorsements {
						id
						body
						author {
							id
							name
							email
							image
						}
					}
					likes {
						_id
						name
						email
						image
					}
					promoted
					views
					comments {
						_id
						content
						date
						likes
						author {
							_id
							name
							email
							image
						}
					}

					category
					region
					author {
						_id
						name
						email
						image
					}
				}
				image
				comments {
					_id
					content
					date
					likes
					author {
						_id
						name
						email
						image
					}
				}
				likes {
					_id
					name
					email
					image
				}
				shares
				author {
					_id
					name
					description
					email
					image
				}
				__typename
		}
	}
`