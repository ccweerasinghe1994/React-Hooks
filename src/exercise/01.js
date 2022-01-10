// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [nameValue, setNameValue] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    const {value} = event.target

    setNameValue(value)
  }
  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input value={nameValue} onChange={handleChange} id="name" />
      </form>
      {nameValue ? <strong>Hello {nameValue}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="chamara" />
}

export default App
