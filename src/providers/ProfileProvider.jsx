import React, { useReducer } from 'react'
import { ProfileContext } from '../context'
import { initialState, ProfileReducer } from '../reducers/ProfileReducer'

function ProfileProvider({children}) {
    const[state,dispatch]=useReducer(ProfileReducer,initialState)

  return (
    <ProfileContext.Provider value={{state,dispatch}}>
        {children}
      
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
