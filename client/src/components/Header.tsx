import type { User } from './../util/models'

import { useState } from 'react'

import FetchWrapper from "../util/fetch-wrapper"

export default function Header({ user, onSetUser, baseURL }: { user: User | null, onSetUser: (user: User | null) => void, baseURL: string }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const API = new FetchWrapper(baseURL)

    const handleLogin = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()

        try {
            const response = await API.post('user/login', { email, password })
            if (response.ok) {
                const data = await response.json()
                // console.log(data)

                onSetUser(data.user)
                setEmail('')
                setPassword('')

            } else {
                alert('Incorrect email or password')
            }

        } catch (error) {
            alert('Server error. Please try again later.')

        }
    }

    return (
        <header className="flex space-between align-items-center">
            <img src="" alt="Website logo"/>
            {user 
                ?   <div className="flex space-between align-items-center">
                        <p className="padding-0100 margin-0">{user.email}</p>
                        <button onClick={() => onSetUser(null)}>Log out</button>
                    </div>
                :   <form onSubmit={handleLogin}>
                        <input 
                            type="email"
                            id='email'
                            onChange={(event) => setEmail(event.target.value)} 
                            value={email}
                            placeholder="name@email.com"
                            required
                        />
                        <input 
                            type="password"
                            id='password'
                            onChange={(event) => setPassword(event.target.value)} 
                            value={password}
                            placeholder="••••••••"
                            required
                        />
                        <button>Log in</button>
                    </form>
            }
        </header>
    )
}