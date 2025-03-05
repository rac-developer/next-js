
'use client'

import { ComponentPropsWithoutRef } from "react"

type ButtonProps =  ComponentPropsWithoutRef<'button'>

const Button = ({onClick, ...rest}: ButtonProps) => {

  const handleClick = () => {
    if (onClick) {
      alert('clicked')
      onClick()
    }
  }

  return <button onClick={handleClick} {...rest}>Button</button>
}

const page = () => {
  return (
    <div>
      <Button   
      onClick={() => alert('Hello World')}
      style={{
        backgroundColor: 'red',
      }}
      >
        Click me
      </Button>
    </div>
  )
}

export default page