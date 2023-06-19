import { State } from "@/constants/state";
import IReport from "@/schema/report";
import { createSlice } from "@reduxjs/toolkit";
import {
  getApplicationReportsThunk,
  getCompanyReportsThunk,
  getRouteReportsThunk,
} from "./thunk";

interface IReportSlice {
  applicationReports: {
    status: State;
    data?: IReport[];
  };
  companyReports: {
    status: State;
    data?: IReport[];
  };
  routeReports: {
    status: State;
    data?: IReport[];
  };
}

const initialState: IReportSlice = {
  applicationReports: {
    status: State.IDLE,
  },
  companyReports: {
    status: State.IDLE,
  },
  routeReports: {
    status: State.IDLE,
  },
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationReportsThunk.pending, (state) => {
        state.applicationReports = {
          ...state.applicationReports,
          status: State.LOADING,
        };
      })
      .addCase(getApplicationReportsThunk.fulfilled, (state, action) => {
        state.applicationReports = {
          ...state.applicationReports,
          status: State.IDLE,
          data: action.payload,
        };
      })
      .addCase(getApplicationReportsThunk.rejected, (state) => {
        state.applicationReports = {
          ...state.applicationReports,
          status: State.IDLE,
        };
      });
    builder
      .addCase(getCompanyReportsThunk.pending, (state) => {
        state.companyReports = {
          ...state.companyReports,
          status: State.LOADING,
        };
      })
      .addCase(getCompanyReportsThunk.fulfilled, (state, action) => {
        state.companyReports = {
          ...state.companyReports,
          status: State.IDLE,
          data: action.payload,
        };
      })
      .addCase(getCompanyReportsThunk.rejected, (state) => {
        state.companyReports = {
          ...state.companyReports,
          status: State.IDLE,
        };
      });

    builder
      .addCase(getRouteReportsThunk.pending, (state) => {
        state.routeReports = {
          ...state.routeReports,
          status: State.LOADING,
        };
      })
      .addCase(getRouteReportsThunk.fulfilled, (state, action) => {
        state.routeReports = {
          ...state.routeReports,
          status: State.IDLE,
          data: action.payload,
        };
      })
      .addCase(getRouteReportsThunk.rejected, (state) => {
        state.routeReports = {
          ...state.routeReports,
          status: State.IDLE,
        };
      });
  },
});

export default reportSlice.reducer;
