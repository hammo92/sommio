import React, { createContext, useReducer } from 'react'
let FirebaseContext
const { Provider, Consumer } = (FirebaseContext = createContext())
export const SET_FIREBASE = 'SET_FIREBASE'

export const initialState = {
  firebase: null
}
export default function reducer(state, action) {
  switch (action.type) {
    case SET_FIREBASE:
      const firebase = action.firebase
      return {
        ...state,
        firebase: firebase
      }

    default:
      return state
  }
}

function FirebaseProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setFirebase = firebase => {
    dispatch({ type: SET_FIREBASE, firebase })
  }
  return (
    <Provider
      value={{
        ...state,
        ...props,
        setFirebase
      }}
    >
      {children}
    </Provider>
  )
}

export { FirebaseProvider, Consumer as FirebaseConsumer, FirebaseContext }
