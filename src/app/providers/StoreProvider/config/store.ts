import { tableReducer } from '@entities/table';
import { configureStore } from '@reduxjs/toolkit';

import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: {
      table: tableReducer,
    },
    preloadedState: initialState,
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
