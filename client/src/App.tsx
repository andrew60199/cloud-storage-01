import type { User } from './util/models'

import { useState } from 'react'
import Header from './components/Header'
import './styles.css'

import AccessiblePhotos from './components/AccessiblePhotos'
import UserSection from './components/UserSection'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const baseURL = 'http://localhost:3001/api/'

  const handleSetUser = (user: User | null) => {
    setUser(user)
  }

  return (
    <>
      <Header user={user} onSetUser={handleSetUser} baseURL={baseURL} />
      {user && <UserSection baseURL={baseURL} />}
      <AccessiblePhotos />
    </>
  )
}

export default App