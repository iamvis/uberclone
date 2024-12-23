import React, { createContext, useState } from 'react'

//context for user data
export const  UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullname:{
            firstName:'',
            lastName:''
        }
    });
   

  return (
    <div>
        //provider use for providing data
      <UserDataContext.Provider value={[user, setUser]}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
