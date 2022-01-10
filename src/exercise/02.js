// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocationStorage = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [state, setState] = React.useState(() => {
    const valueFromLocalStorage = window.localStorage.getItem(key)
    if (valueFromLocalStorage) {
      return deserialize(valueFromLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })
  const prevKeyRef = React.useRef(key)
  console.log(prevKeyRef)
  React.useEffect(() => {
    let prevKey = prevKeyRef.current
    console.log(prevKey)
    if (prevKey !== key) {
      console.log('prevKey !== key')
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key

    window.localStorage.setItem(key, serialize(state))
  }, [serialize, key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocationStorage('blob', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="bob" />
}

export default App
