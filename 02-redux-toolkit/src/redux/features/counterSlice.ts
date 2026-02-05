import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  counter: 0
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Funciones
    increment: (state) => {
      state.counter += 1
    },
    decrement: (state) => {
      state.counter -= 1
    },
  }
})
// Se exporta dos veces porque el counterSlice.actions se va exportar cuando sea necesario y...
export const {increment, decrement} = counterSlice.actions

// Y este por defecto, cuano no utilice el actions
export default counterSlice.reducer