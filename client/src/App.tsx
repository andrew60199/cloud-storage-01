import type { User } from './util/models'

import { useState } from 'react'
import Header from './components/Header'
import './styles.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const baseURL = 'http://localhost:3001/api/'

  const handleSetUser = (user: User | null) => {
    setUser(user)
  }

  return (
    <>
      <Header user={user} onSetUser={handleSetUser} baseURL={baseURL} />
    </>
  )
}

export default App