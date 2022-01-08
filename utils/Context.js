import React, { createContext, useState } from "react";

const UserContext = createContext()

const context = {
  UserContext: UserContext,
  UserContextProvider: function(props){
    const [user,setUser] = useState(props.user)
    return(
      <UserContext.Provider value={{
        user,
        setUser
      }}>
        {props.children}
      </UserContext.Provider>
    )
  }
}

module.exports = context