export interface IDonationProps {
     amount: number;
     custName: string;
     email: string;
     mobile: string;
     referenceId: string;
     paymentToken: string;
     status: DonationStatus;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export type DonationStatus = "SUCCESS" | "REFUNDED" | "FAILED" | "CANCELLED" | "NOT_PERFORMED" | "INITIATED";

export interface SendMailProps {
     donatorMailId: string;
     subject: string;
     fileLink: string;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
