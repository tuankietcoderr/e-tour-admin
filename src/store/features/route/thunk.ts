import { deleteRoute, getAllRoutes } from "@/api/route";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllRoutesThunk = createAsyncThunk(
  "route/getAllRoutesThunk",
  async () => {
    try {
      const res = await getAllRoutes();
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

const deleteRouteThunk = createAsyncThunk(
  "route/deleteRouteThunk",
  async (id: string) => {
    try {
      const res = await deleteRoute(id);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export { getAllRoutesThunk, deleteRouteThunk };
