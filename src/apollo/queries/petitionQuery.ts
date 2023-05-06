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
	query myPetition($authorId: ID!) {
		myPetition(authorId: $authorId) {
			_id
			title
			image
			aim
			body
			target
			slug
			createdAt
			comments{
				_id
				content
				author{
					_id
					name
					email
					image
				}
				date
			}
			likes{
				_id
				name
			}
			promoted
			views
			category
			region
			author{
				 _id
					name
					email
					image
			}
			updates{
				body
				image
				createdAt
			}
		}
	}
`
export const SINGLE_PETITION = gql`
	query getPetition($slug: String!) {
		getPetition(slug: $slug) {
			_id
    title
    image
    aim
    body
    target
    slug
    comments{
      _id
      content
      author{
        _id
        name
        email
        image
      }
      date
    }
    likes{
      _id
      name
    }
    promoted
    views
    category
    region
    author{
       _id
        name
        email
        image
    }
    updates{
      body
      image
      createdAt
    }
		}
	}
`
export const SINGLE_PETITION_ID = gql`
	query getPetitionByID($id: ID!) {
		getPetitionByID(id: $id) {
			_id
    title
    image
    aim
    body
    target
    slug
		createdAt
    comments{
      _id
      content
      author{
        _id
        name
        email
        image
      }
      date
    }
    likes{
      _id
      name
    }
    promoted
    views
    category
    region
    author{
       _id
        name
        email
        image
    }
    updates{
      body
      image
      createdAt
    }
		}
	}
`
