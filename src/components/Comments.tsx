import React, { useState } from "react"
import ReactTimeAgo from "react-time-ago"
import { COMMENT } from "apollo/queries/generalQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"

const Comments = ({ comments }: { comments: any }) => {
	const [content, setContent] = useState("")
	const [qty, setQty] = useState(4)
	const author = useRecoilValue(UserAtom)

	const comment = async (id) => {
		if (content.length === 0) return
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(COMMENT),
				variables: {
					authorId: author.id,
					itemId: id,
					content: content,
				},
			})
			// toast.success("Comment sent")
			console.log(data)
		} catch (error) {
			console.log(error)
			// toast.warn("Oops! Something went wrong")
		}
	}
	return (
		<div>
			<div className="flex border-t border-gray-200 p-2 relative">
				<img src={author.image} className="w-10 h-10 mr-3 rounded-full my-auto" alt="" />
				<input type="text" onChange={(e) => setContent(e.target.value)} className="p-2 w-full border border-black text-sm" placeholder="Write a comment" />
				<img src="./images/send.png" onClick={() => comment(comments._id)} className="w-6 h-6 absolute top-4 right-6" alt="" />
			</div>
			{comments.length > 0
				? comments?.slice(0, qty).map((comment, index) => (
						<div key={index} className="flex p-2">
							<img src={comment.author.image} className="w-10 h-10 mr-3 my-auto rounded-full" alt="" />
							<div className="w-full bg-gray-100 p-2 flex justify-between">
								<div className="">
									<div className="font-bold text-sm mt-1">{comment.author.name}</div>
									<div className="text-xs mt-1">{comment.content}</div>
								</div>
								<div className="text-sm">
									<ReactTimeAgo date={new Date(comment.date)} />{" "}
								</div>
							</div>
						</div>
				  ))
				: null}
			{comments.length > 4 ? (
				<div onClick={() => setQty(qty + 4)} className="text-base text-warning text-center">
					show more
				</div>
			) : null}
		</div>
	)
}

export default Comments
