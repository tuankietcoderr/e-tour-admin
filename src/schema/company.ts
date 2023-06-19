export enum ProfileState {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface ICompany {
  _id?: string;
  isApproveToActive: boolean;
  profileState?: ProfileState;
  name: string;
  email: string;
  description: string;
  image?: string;
  previewImages?: string[];
  address: string;
  phone: string;
}
