import { RootState } from "../../../../app/store/store";

export const selectUser = (state: RootState) => state.usersDetails;
