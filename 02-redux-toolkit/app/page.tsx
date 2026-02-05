'use client'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { increment, decrement } from '@/src/redux/features/counterSlice'

function HomePage() {
  const count = useAppSelector(state => state.counterReducer.counter)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>
        total: {count}
      </h1>
      <button
        onClick={() => {
          dispatch(increment())
        }}
      >
        Increment
      </button>
      <br />
      <button
        onClick={() => {
          dispatch(decrement())
        }}
      >
        Decrement
      </button>
    </div>
  )
}

export default HomePage
