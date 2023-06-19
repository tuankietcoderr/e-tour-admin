import {
  banCompany,
  deleteCompany,
  getAllCompanies,
  unbanCompany,
} from "@/api/company";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllCompaniesThunk = createAsyncThunk("company/getAll", async () => {
  try {
    const res = await getAllCompanies();
    return res.data;
  } catch (err) {
    throw err;
  }
});

const banCompanyThunk = createAsyncThunk("company/ban", async (id: string) => {
  try {
    const res = await banCompany(id);
    return res.data;
  } catch (err) {
    throw err;
  }
});

const unbanCompanyThunk = createAsyncThunk(
  "company/unban",
  async (id: string) => {
    try {
      const res = await unbanCompany(id);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const deleteCompanyThunk = createAsyncThunk(
  "company/delete",
  async (id: string) => {
    try {
      const res = await deleteCompany(id);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export {
  getAllCompaniesThunk,
  banCompanyThunk,
  unbanCompanyThunk,
  deleteCompanyThunk,
};
