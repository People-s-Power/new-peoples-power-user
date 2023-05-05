import gql from "graphql-tag"

export const CREATE_POST = gql`
	mutation createPost($authorId: ID!, $body: String!, $imageFile: [String!]!, $categories: [String!]!) {
		createPost(authorId: $authorId, body: $body, imageFile: $imageFile, categories: $categories) {
			_id
			body
			isPetition
			image
			promoted
			createdAt
			updatedAt
			__typename
		}
	}
`

export const UPDATE_POST = gql`
	mutation updatePost($authorId: ID!, $body: String!, $postId: ID!, $imageFile: [String!]!, $categories: [String!]!) {
		updatePost(authorId: $authorId, body: $body, postId: $postId, imageFile: $imageFile, categories: $categories) {
			_id
			body
			isPetition
			image
			promoted
			createdAt
			updatedAt
			__typename
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
	query myPosts($authorId: ID!) {
		myPosts (authorId: $authorId) {
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
	}
`

export const DELETE_POST = gql`
	mutation deletePost($authorId: ID!, $postId: ID!) {
		deletePost(authorId: $authorId, postId: $postId) {
			_id
		}
	}
`

export const GET_POST = gql`
	query getPost($id: ID!) {
		getPost (id: $id) {
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
	}
`