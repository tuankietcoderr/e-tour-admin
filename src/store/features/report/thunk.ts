import {
  viewApplicantReport,
  viewCompanyReport,
  viewRouteReport,
} from "@/api/report";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getApplicationReportsThunk = createAsyncThunk(
  "report/getApplicationReports",
  async () => {
    try {
      const res = await viewApplicantReport();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const getCompanyReportsThunk = createAsyncThunk(
  "report/getCompanyReports",
  async () => {
    try {
      const res = await viewCompanyReport();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const getRouteReportsThunk = createAsyncThunk(
  "report/getRouteReports",
  async () => {
    try {
      const res = await viewRouteReport();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export {
  getApplicationReportsThunk,
  getCompanyReportsThunk,
  getRouteReportsThunk,
};
