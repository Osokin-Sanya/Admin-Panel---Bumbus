import { RootState } from "../../../app/store/store";

export const selectProducts = (state: RootState) => state.product;
