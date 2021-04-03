import { User } from '@firebase/auth-types'
import { FC, createContext, useEffect, useState } from 'react'

import { auth } from 'services/firebase';

type AuthContextProps = {
  currentUser: User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }