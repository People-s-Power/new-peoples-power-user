import gql from "graphql-tag"

export const CREATE_POST = gql`
	mutation createPost($authorId: ID!, $body: String!, $imageFile: [String!]!) {
		createPost(authorId: $authorId, body: $body, imageFile: $imageFile) {
			_id
			body
			isPetition
			image
			promoted
			createdAt
			updatedAt
		}
	}
`

export const UPDATE_POST = gql`
	mutation updatePost($authorId: ID!, $body: String!, $postId: ID!, $imageFile: [String!]!) {
		updatePost(authorId: $authorId, body: $body, postId: $postId, imageFile: $imageFile) {
			_id
			body
			isPetition
			image
			promoted
			createdAt
			updatedAt
		}
	}
`

export const GET_POSTS = gql`
	query getPosts {
		getPosts {
			_id
			body
			comments {
				author
				body
			}
			image
			likes
			shares
			author {
				name
				email
			}
		}
	}
`

export const GET_USER_POSTS = gql`
	query myPosts {
		myPosts {
			body
			image
		}
	}
`

export const DELETE_POST = gql`
	mutation deletePost($authorId: ID!, $postId: ID!) {
		deletePost(authorId: $authorId, postId: $postId) {
			_id
		}
	}
`
