import { getAllRegistration, updateRegistration } from "@/api/registration";
import IReport from "@/schema/report";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllRegistrationsThunk = createAsyncThunk(
  "registration/getAllCompanyRegistrations",
  async () => {
    try {
      const res = await getAllRegistration();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const updateRegistrationThunk = createAsyncThunk(
  "registration/updateCompanyRegistration",
  async ({
    isApproveToActive,
    id,
  }: {
    isApproveToActive: boolean;
    id: string;
  }) => {
    try {
      const res = await updateRegistration({
        isApproveToActive,
        id,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export { getAllRegistrationsThunk, updateRegistrationThunk };
