import { ProfileState } from "@/schema/company";
import { RootState } from "@/store";

export const selectRegistrations = (state: RootState) => state.registrations;
export const selectPendingRegistrations = (state: RootState) =>
  state.registrations.registrations?.filter(
    (registration) => registration.profileState === ProfileState.PENDING
  );

export const selectRejectedRegistrations = (state: RootState) =>
  state.registrations.registrations?.filter(
    (registration) => registration.profileState === ProfileState.REJECTED
  );
