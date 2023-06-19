import { RootState } from "@/store";

export const selectCompanies = (state: RootState) => state.companies;
export const selectCompanyWithId = (state: RootState, id: string) =>
  state.companies.companies?.find((company) => company._id === id);

export const selectCompany = (state: RootState) => state.companies.company;
