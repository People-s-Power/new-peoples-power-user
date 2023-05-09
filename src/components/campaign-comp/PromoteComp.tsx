import { gql, useQuery } from "@apollo/client"
import { UserAtom } from "atoms/UserAtom"
import PromoteModalComp from "components/PromoteModalComp"
import ChoosePromotion from "components/ChoosePromotion"
import Cookies from "js-cookie"
import FrontLayout from "layout/FrontLayout"
import router, { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { PaystackButton, usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { ICampaign } from "types/Applicant.types"
import { PaymentPurposeEnum } from "types/payment.interface"
import { IEnvironments } from "utils/constants"
import { checkFX, formateMoney } from "utils/formateMoney"
import Link from "next/link"
import axios from "axios"
import { apollo } from "apollo"
import ReactTimeAgo from "react-time-ago"
import { SINGLE_PETITION } from "apollo/queries/petitionQuery"

export const GET_CAMPAIGN = gql`
	query ($slug: String) {
		getCampaign(slug: $slug) {
			title
			id
			image
			slug
			target
		}
	}
`

export enum CurrencyListEnum {
	NGN = "NGN",
	GHS = "GHS",
	ZAR = "ZAR",
	USD = "USD",
}
export interface ITransactions {
	purpose: string
	length: number
}

const PromoteComp = (): JSX.Element => {
	const user = useRecoilValue(UserAtom)
	const [campaign, setCampaign] = useState<ICampaign>()
	const { query } = useRouter()
	const [showModal, setShowModal] = useState(false)
	const [showModalClose, setShowModalClose] = useState(false)
	const [transactions, setTransactions] = useState<ITransactions[]>([])

	const { error, data } = useQuery(SINGLE_PETITION, {
		client: apollo,
		variables: { slug: query.slug },
		onCompleted: (data) => {
			setCampaign(data.getCampaign)
		},
		onError: (err) => console.log(err),
	})

	let view = useMemo(() => {
		const initialView = Boolean(query?.view)
		return initialView
	}, [query])

	const endorse = useMemo(() => {
		const initialEndorse = Boolean(query?.endorse)
		// console.log(initialEndorse)
		return initialEndorse
	}, [query])

	const message = useMemo(() => {
		const initialMessage = Boolean(query?.message)
		// console.log(initialEndorse)
		return initialMessage
	}, [query])

	useEffect(() => {
		query.slug === undefined ? (view = true) : null
		if (!error && query.slug !== undefined) {
			setCampaign(data?.getPetition)
			console.log(data)
		}
		axios
			.get("/transaction")
			.then(function (response) {
				// console.log(response.data);
				setTransactions(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [data, error])

	// if (loading) return (
	// 	<div className="my-10 w-full text-center">
	// 		<Image className="mx-auto" src="/images/logo.svg" alt="" />
	// 		<div className="my-4">
	// 			<div className="text-xl">Hold on while we Process your request</div>
	// 			<div className="text-base">Ensure your internet is stable</div>
	// 		</div>
	// 		<Link href="/">
	// 			<button className="px-12 bg-warning p-2 my-3 rounded-md">
	// 				Go back
	// 			</button>
	// 		</Link>
	// 	</div>
	// );
	// if (!view && !endorse) {

	return (
		<div>
			{/* <PromoteForm campaign={query.slug} /> */}
			{view || endorse || message ? (
				<PromoteForm campaign={campaign} view={view} endorse={endorse} message={message} />
			) : (
				<FrontLayout>
					<Wrapper className="container">
						<PromoteModalComp show={showModalClose} onHide={() => setShowModalClose(false)} />
						<ChoosePromotion show={showModal} onHide={() => setShowModal(false)} />
						<div className="inner-wrapper">
							<div>
								<div className="card">
									<div className="card-Image">
										<img src={campaign?.image} className="w-full h-1/2 object-cover" alt="" />
									</div>
									<div className="card-body">
										<h4 className="fw-bold">{campaign?.title}</h4>
										<p>
											<b className="text-primary">Campaign Target</b>: {campaign?.target}
										</p>
									</div>
								</div>
								<div className="promotion mt-5">
									<p>Hello {user?.firstName}, let our Community of Supporters know about this campaign for support and more endorsements by promoting it.</p>

									<ul className="nav flex-column">
										<li className="nav-item mb-2 ms-3">
											Promoting this campaign will help push it to interested supporters who will endorse it and enable you reach your campaign goal.
										</li>
										<li className="nav-item mb-2 ms-3">
											Our community of supporters can also help you promote this campaign and spare in some cash if this campaign is promoted to them.
										</li>

										{/* <li className="nav-item mb-2 ms-3">
												Hit the promote button below to reach our Community of
												Supporters who are interested in supporting this Campaign.
											</li>  */}
									</ul>
									<div>
										{transactions && transactions?.length > 1
											? transactions.slice(0, 6).map((item: any, i) => (
												<div key={i} className="mx-auto bg-gray-50 text-center my-2 p-2">
													{item?.message + " "}
													<ReactTimeAgo date={item?.paid_at} locale="en-US" />
												</div>
											))
											: null}
									</div>
									<div className="my-5 text-center promote-btn ">
										<button onClick={() => setShowModal(true)} className="btn btn-warning ">
											Promote Now
										</button>
										<div className="text-center">
											<a className="btn" onClick={() => setShowModalClose(true)}>
												I Will Promote later
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Wrapper>
				</FrontLayout>
			)}
		</div>
	)
}

export default PromoteComp

const Wrapper = styled.div`
	h1 {
		font-size: 2.25rem;
		font-weight: bold;
	}
	.nav {
		list-style: circle;
	}
	.promote-btn {
		a {
			text-decoration: none;
		}
	}
	.bulk {
		&-option {
			cursor: pointer;
			margin-bottom: 1rem;
		}
	}
	.inner-wrapper {
		width: 100%;
		max-width: 600px;
		margin: auto;
		.card {
			box-shadow: 0px 10px 19px rgba(0, 0, 0, 0.06);
			border-radius: 15px;
			border-width: 0;
			Image {
				width: 100%;
				height: 226px;
				object-fit: cover;
			}
		}
		select {
			/* appearance: unset; */
			background-color: rgba(245, 246, 250, 1);
			border: none;
			outline: none;
			&:focus {
				border: none;
				outline: none;
			}
		}
		input {
			all: unset;
			border-bottom: 2px solid rgba(0, 64, 28, 1);

			margin: 0 1rem;
		}
	}
`

const PromoteForm = ({ campaign, view, endorse, message }: { campaign: any; view: boolean; endorse: boolean; message: boolean }) => {
	const user = useRecoilValue(UserAtom)
	const [views, setViews] = useState(10)
	const [amount, setAmount] = useState(20)
	const [loadingPrice, setLoadingPrice] = useState(false)
	const [currency, setCurrency] = useState<CurrencyListEnum>(CurrencyListEnum.NGN)

	const paystack_config: PaystackProps = {
		reference: new Date().getTime().toString(),
		email: user?.email as string,
		amount: parseFloat(amount.toFixed(2)) * 100,
		firstname: user?.firstName,
		lastname: user?.lastName,
		currency,
		publicKey: process.env.NODE_ENV === "production" ? (Cookies.get(IEnvironments.PAYSTACK_PK) as string) : "pk_live_13530a9fee6c7840c5f511e09879cbb22329dc28",
		metadata: {
			purpose: view === true ? PaymentPurposeEnum.VIEWS : endorse === true ? PaymentPurposeEnum.ENDORSE : PaymentPurposeEnum.MESSAGE,
			key: campaign,
			numberOfViews: views,
			name: user.name,
			custom_fields: [
				{
					display_name: view === true ? PaymentPurposeEnum.VIEWS : endorse === true ? PaymentPurposeEnum.ENDORSE : PaymentPurposeEnum.MESSAGE,
					value: campaign,
					variable_name: "title",
				},
			],
		},
	}

	const initializePayment = usePaystackPayment(paystack_config)
	const router = useRouter()
	const onSuccess = async () => {
		console.log(paystack_config)
		router.push("/mycamp")
	}
	const onClose = () => {
		console.log("")
	}

	useEffect(() => {
		const convert = async () => {
			try {
				setLoadingPrice(true)
				const unit = await checkFX(currency)
				const result = unit * 20

				setAmount(views * result)
			} catch (error) {
				console.log(error)
			} finally {
				setLoadingPrice(false)
			}
		}
		convert()
	}, [currency, views])

	return (
		<FrontLayout>
			<Wrapper className="container">
				<div className="md:w-[506px] m-auto">
					<div className="cursor-pointer text-sm text-blue-700" onClick={() => window.history.back()}>
						Go back
					</div>
					<div className="text-center mt-3">
						Wow <span className="fw-bold">{user?.firstName}</span>…you are just one step away from reaching our Community of Supporters who will help you
						achieve your goal. Spare in some cash to win your supporters.
					</div>
					<p className="my-4 text-center fw-bold">How do you want to promote your campaign views?</p>

					<h5 className="fw-bold">Bulk Option</h5>
					<div className="bulk">
						{bulkOptions.map((option, i) => (
							<div key={i} className="row w-100 bulk-option align-items-center justify-content-between cursor-pointer">
								<p className="m-0 col-4">
									<i className="fas fa-eye"></i> {option.views} Views
								</p>
								<p className="m-0 col-4">=</p>
								<PaystackButton
									reference={new Date().getTime().toString()}
									email={user?.email as string}
									amount={option.price * 100}
									firstname={user?.firstName}
									lastname={user?.lastName}
									onSuccess={onSuccess}
									publicKey={
										process.env.NODE_ENV === "production"
											? (Cookies.get(IEnvironments.PAYSTACK_PK) as string)
											: "pk_live_13530a9fee6c7840c5f511e09879cbb22329dc28"
									}
									metadata={{
										purpose: PaymentPurposeEnum.VIEWS,
										key: campaign?.id,
										numberOfViews: option.views,
										name: user.name,
										custom_fields: [
											{
												display_name: PaymentPurposeEnum.VIEWS,
												value: campaign?.title,
												variable_name: "title",
											},
										],
									}}
									text={`N${option.price}`}
									className="btn text-primary col-4"
								/>
							</div>
						))}
					</div>

					<h5 className="fw-bold my-3">Customize</h5>
					<form>
						<div className="form-group text-center">
							<label className="">
								<i className="fas fa-eye"></i> Views
							</label>
							<input type="number" value={views} onChange={(e) => setViews(+e.target.value)} style={{ width: "4rem", appearance: "none" }} />
							<i className="fas fa-exchange-alt"></i>
							<input type="text" value={loadingPrice ? "calculating..." : formateMoney(amount, currency)} disabled />
							<select className="" onChange={(e) => setCurrency(e.target.value as CurrencyListEnum)}>
								<option>{CurrencyListEnum.NGN}</option>
								<option>{CurrencyListEnum.GHS}</option>
								<option>{CurrencyListEnum.ZAR}</option>
								<option>{CurrencyListEnum.USD}</option>
							</select>
						</div>
					</form>
					<div className="text-center">
						<button className="btn btn-warning my-4" onClick={() => initializePayment(onSuccess, onClose)}>
							Click to pay
						</button>
					</div>
				</div>
			</Wrapper>
		</FrontLayout>
	)
}

const bulkOptions = [
	{ views: 100, price: 1000 },
	{ views: 200, price: 1500 },
	{ views: 400, price: 2500 },
	{ views: 1000, price: 5000 },
	{ views: 2000, price: 8000 },
	{ views: 3000, price: 10000 },
]

const bulkOptionsEndorse = [
	{ endorsements: 100, price: 800 },
	{ endorsements: 200, price: 1200 },
	{ endorsements: 400, price: 2200 },
	{ endorsements: 1000, price: 4800 },
	{ endorsements: 2000, price: 7800 },
	{ endorsements: 3000, price: 9800 },
]
