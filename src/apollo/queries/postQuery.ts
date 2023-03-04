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
	mutation updatePost($authorId: ID!, $body: String!, $postId: ID!) {
		updatePost(authorId: $authorId, body: $body, postId: $postId) {
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

// export const GET_POST = gql
// `
// query getPost($ID: ID!){
//     getPost(id: $ID){
//         _id
//         body
//         comments {
//             author
//             body
//         }
//         image
//         likes
//         shares
//         author {
//             name
//             email
//         }
//         isPetition
//     }
// }
// `
// export const UPDATE_BODY = gql
// `mutation updatePost() {
//     updatePost(body: "Try rest shall", postId: "635d7d633d10e290b5583a90") {
//         body
//         comments {
//             author
//             body
//         }
//         image
//         author {
//             name
//             email
//         }

//     }
// }`

export const GET_USER_POSTS = gql`
	query myPosts {
		myPosts {
			body
			image
		}
	}
`
