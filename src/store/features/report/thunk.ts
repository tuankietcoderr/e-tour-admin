import { deleteReport, viewAllReport } from "../../../api/report";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllReportsThunk = createAsyncThunk(
  "report/getAllReports",
  async () => {
    try {
      const res = await viewAllReport();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const deleteReportThunk = createAsyncThunk(
  "report/deleteReport",
  async (id: string) => {
    try {
      const res = await deleteReport(id);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export { getAllReportsThunk, deleteReportThunk };
