import { State } from "@/constants/state";
import { ICompany } from "@/schema/company";
import { createSlice } from "@reduxjs/toolkit";
import {
  banCompanyThunk,
  deleteCompanyThunk,
  getAllCompaniesThunk,
  unbanCompanyThunk,
} from "./thunk";

interface ICompanySlice {
  companies?: ICompany[];
  status: State;
  company?: ICompany;
}

const initialState: ICompanySlice = {
  status: State.IDLE,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyWithId: (state, action) => {
      state.company = state.companies?.find(
        (company) => company._id === action.payload
      );
    },
    clearCompanies: (state) => {
      state.companies = undefined;
      state.company = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompaniesThunk.pending, (state) => {
        state.status = State.LOADING;
      })
      .addCase(getAllCompaniesThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.companies = action.payload;
      })
      .addCase(getAllCompaniesThunk.rejected, (state) => {
        state.status = State.IDLE;
      });

    builder
      .addCase(banCompanyThunk.pending, (state) => {})
      .addCase(banCompanyThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.companies = state.companies?.map((company) => {
          if (company._id === action.payload._id) {
            return action.payload;
          }
          return company;
        });
      })
      .addCase(banCompanyThunk.rejected, (state) => {});

    builder
      .addCase(unbanCompanyThunk.pending, (state) => {})
      .addCase(unbanCompanyThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.companies = state.companies?.map((company) => {
          if (company._id === action.payload._id) {
            return action.payload;
          }
          return company;
        });
      })
      .addCase(unbanCompanyThunk.rejected, (state) => {});

    builder
      .addCase(deleteCompanyThunk.pending, (state) => {})
      .addCase(deleteCompanyThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.companies = state.companies?.filter(
          (company) => company._id !== action.payload._id
        );
      })
      .addCase(deleteCompanyThunk.rejected, (state) => {});
  },
});

export default companySlice.reducer;

export const { setCompanyWithId } = companySlice.actions;
export const { clearCompanies } = companySlice.actions;
