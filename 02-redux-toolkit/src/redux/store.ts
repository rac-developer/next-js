import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import { userAPI } from './services/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    counterReducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  // Funcion que puede ejecutar datos asincronos que vienen del backend
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userAPI.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch