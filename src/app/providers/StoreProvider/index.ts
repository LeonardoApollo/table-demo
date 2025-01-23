import { StateSchema } from "./config/StateSchema";
import { AppDispatch, createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvder";

export {StoreProvider, createReduxStore}
export type {
    StateSchema,
    AppDispatch
}