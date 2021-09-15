import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext();

export function Provider({ children }) {
  const data = new Data();
  const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null)

  async function signIn(emailAddress, password) {
    const user = await data.getUser(emailAddress, password)
    user['password'] = password;

    if (user !== null) {
      setAuthenticatedUser(user)
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1, sameSite: false, secure: false })
    }
    return user
  }

  function signOut() {
    setAuthenticatedUser(null)
    Cookies.remove('authenticatedUser')
  }

  const value = {
    authenticatedUser,
    data,
    actions: {
      signIn,
      signOut
    }
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export const Consumer = Context.Consumer;
