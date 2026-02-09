'use client'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { increment, decrement } from '@/src/redux/features/counterSlice'
import { useGetUsersQuery, useGetUserByIdQuery } from '@/src/redux/services/userApi'

function HomePage() {
  const count = useAppSelector(state => state.counterReducer.counter)

  const { data, error, isLoading, isFetching } = useGetUsersQuery(null)

  if (isLoading || isFetching) return <p>Loading...</p>
  if (error) return <p>Some error...</p>

  const dispatch = useAppDispatch()

  return (
    <>
      <h1 className='text-center text-2xl'>
        total: {count}
      </h1>

      <div className="flex justify-center gap-x-2">  
        <button
          onClick={() => {
            dispatch(increment())
          }}
          className='bg-green-500 px-3 py-2 rounded-md'
        >
          Increment
        </button>
        <br />
        <button
          onClick={() => {
            dispatch(decrement())
          }}
          className='bg-blue-500 px-3 py-2 rounded-md'
        >
          Decrement
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-auto gap-3">
        {
          data?.map(user => (
            <div key={user.id} className='bg-zinc-800 p-4'>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div> 
          ))
        }
      </div>
    </>
  )
}

export default HomePage
