import { State } from "@/constants/state";
import IReport from "@/schema/report";
import { createSlice } from "@reduxjs/toolkit";
import { deleteReportThunk, getAllReportsThunk } from "./thunk";

interface IReportSlice {
  reports?: IReport[];
  status: State;
}

const initialState: IReportSlice = {
  status: State.IDLE,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReports: (state) => {
      state.reports = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReportsThunk.pending, (state) => {
        state.status = State.LOADING;
      })
      .addCase(getAllReportsThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.reports = action.payload;
      })
      .addCase(getAllReportsThunk.rejected, (state) => {
        state.status = State.IDLE;
      });

    builder
      .addCase(deleteReportThunk.pending, (state) => {})
      .addCase(deleteReportThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.reports = state.reports?.filter(
          (report) => report._id !== action.payload._id
        );
      })
      .addCase(deleteReportThunk.rejected, (state) => {});
  },
});

export default reportSlice.reducer;
export const { clearReports } = reportSlice.actions;
