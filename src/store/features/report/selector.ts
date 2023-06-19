import { RootState } from "@/store";

export const selectApplicationReports = (state: RootState) =>
  state.reports.applicationReports;
export const selectCompanyReports = (state: RootState) =>
  state.reports.companyReports;
export const selectRouteReports = (state: RootState) =>
  state.reports.routeReports;
