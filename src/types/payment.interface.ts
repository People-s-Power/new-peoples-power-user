export enum PaymentPurposeEnum {
	VIEWS = "Promote views",
	ENDORSE = "Promote endorsement",
	PROMOTION = "Promotion",
	MESSAGE = "Promote in messages",
	APPLICANT_REGISTRATION = "New Applicant Registration",
}

export interface PaystackPaymentResponse {
	message: string;
	redirecturl: string;
	reference: string;
	status: string;
	trans: string;
	transaction: string;
	trxref: string;
}
