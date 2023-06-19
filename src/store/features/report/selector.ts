import { RootState } from "@/store";

export const selectReports = (state: RootState) => state.reports;
export const selectApplicationReports = (state: RootState) =>
  state.reports.reports?.filter(
    (report) => report.reportType === "application"
  );
export const selectCompanyReports = (state: RootState) =>
  state.reports.reports?.filter((report) => report.reportType === "company");
export const selectRouteReports = (state: RootState) =>
  state.reports.reports?.filter((report) => report.reportType === "route");
