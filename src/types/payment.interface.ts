export enum PaymentPurposeEnum {
	CAMPAIGNVIEWS = "Promote Campagin views",
	CAMPAIGNENDORSE = "Promote Campagin Endorsements",
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
