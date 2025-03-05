function identity<T>(value: T) {
  return value
}

interface Box<T> {
  content: T
}

const box1: Box<string> = { content: 'hello' }
const box2: Box<number> = { content: 123 } 
const box3: Box<boolean> = { content: true }

type ApiResponse<T> = {
  status: number;
  data: T;
}

const response1: ApiResponse<{name: string;age: number}> = {
  status: 200,
  data: {
    name: 'John',
    age: 30
  }
}

const response2: ApiResponse<string> ={
  status: 200,
  data: 'Hello world'
}

const response3: ApiResponse<string[]> = {
  status: 200,
  data: ["Hello world", "Hello again"]
}

const page = () => {
  identity<string>('hello world')
  identity<number>(123)
  identity<boolean>(true)

  return (
    <div>
      <input type="text" id="username"/>
    </div>
  )
}

export default page