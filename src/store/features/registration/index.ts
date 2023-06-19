import { State } from "@/constants/state";
import { ICompany } from "@/schema/company";
import { createSlice } from "@reduxjs/toolkit";
import { getAllRegistrationsThunk, updateRegistrationThunk } from "./thunk";

interface IRegistrationSlice {
  status: State;
  registrations?: ICompany[];
}

const initialState: IRegistrationSlice = {
  status: State.IDLE,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    clearRegistrations: (state) => {
      state.registrations = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRegistrationsThunk.pending, (state) => {
        state.status = State.LOADING;
      })
      .addCase(getAllRegistrationsThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.registrations = action.payload;
      })
      .addCase(getAllRegistrationsThunk.rejected, (state) => {
        state.status = State.IDLE;
      });

    builder
      .addCase(updateRegistrationThunk.pending, (state) => {})
      .addCase(updateRegistrationThunk.fulfilled, (state, action) => {
        state.registrations = state.registrations?.map((registration) => {
          if (registration._id === action.payload._id) {
            return action.payload;
          }
          return registration;
        });
      });
  },
});

export default registrationSlice.reducer;
export const { clearRegistrations } = registrationSlice.actions;
