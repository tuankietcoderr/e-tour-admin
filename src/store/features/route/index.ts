import { State } from "@/constants/state";
import { ITouristsRoute } from "@/schema/route";
import { createSlice } from "@reduxjs/toolkit";
import { deleteRouteThunk, getAllRoutesThunk } from "./thunk";

interface IRouteSlice {
  status: State;
  routes?: ITouristsRoute[];
  route?: ITouristsRoute;
}

const initialState: IRouteSlice = {
  status: State.IDLE,
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRouteWithId: (state, action) => {
      state.route = state.routes?.find((route) => route._id === action.payload);
    },
    clearRoutes: (state) => {
      state.routes = undefined;
      state.route = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoutesThunk.pending, (state) => {
        state.status = State.LOADING;
      })
      .addCase(getAllRoutesThunk.fulfilled, (state, action) => {
        state.status = State.IDLE;
        state.routes = action.payload;
      })
      .addCase(getAllRoutesThunk.rejected, (state) => {
        state.status = State.IDLE;
      });

    builder
      .addCase(deleteRouteThunk.pending, (state) => {})
      .addCase(deleteRouteThunk.fulfilled, (state, action) => {
        state.routes = state.routes?.filter(
          (route) => route._id !== action.payload._id
        );
      })
      .addCase(deleteRouteThunk.rejected, (state) => {});
  },
});

export default routeSlice.reducer;

export const { clearRoutes, setRouteWithId } = routeSlice.actions;
