import { Modal } from "rsuite"
import { useState, useRef } from "react"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { CREATE_VICTORIES } from "apollo/queries/victories"

const CreateVictories = ({ open, handelClick, victory }: { open: boolean; handelClick(): void; victory: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const [loading, setLoading] = useState(false)
	const [body, setBody] = useState("")
	const handelSubmit = async () => {
		setLoading(true)
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(CREATE_VICTORIES),
				variables: {
					authorId: author.id,
					body: body,
					imageFile: ["https://www.pngitem.com/pimgs/m/494-4949881_colorful-dream-balloons-png-download-colorful-balloons-png.png"],
				},
			})
			console.log(data)
			setLoading(false)
			handelClick()
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}
	return (
		<>
			<Modal open={open} onClose={handelClick}>
				<Modal.Header>
					<div className="border-b border-gray-200 p-3 w-full">
						<Modal.Title>Celebrate Victory</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="flex">
						<img src={author?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
						<div className="text-sm">{author.name}</div>
					</div>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						name=""
						className="w-full h-32 border border-white text-sm"
						placeholder="Let your supporters congratulate you on this Victory..."
					></textarea>
				</Modal.Body>

				<Modal.Footer>
					<div className="flex justify-between text-gray-500">
						<button onClick={handelSubmit} className="p-1 bg-warning text-white rounded-sm w-40">
							{loading ? "Loading..." : "Celebrate Victory"}
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default CreateVictories
