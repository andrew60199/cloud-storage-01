import type { User } from "../util/models"

import { useEffect, useState } from "react"

import FetchWrapper from "../util/fetch-wrapper"

export default function UserSection ({ user, baseURL }: { user: User | null, baseURL: string }) {
    const [file, setFile] = useState<File | null>(null)
    const [privacy, setPrivacy] = useState('')
    const [sharing, setSharing] = useState<string[]>([])
    const [userEmail, setUserEmail] = useState('')

    const API = new FetchWrapper(baseURL)
    
    useEffect(() => {
        // console.log(file)
        if (file) {
            handlePreview()
        }

    }, [file])

    const handlePreview = () => {
        setPrivacy('')
        setSharing([])

        if (file) {
            // THERE IS PROBABLY A BETTER WAY OF DOING THIS YET THIS WORKS FOR THE TIME BEING
            const preview = document.querySelector('#preview')
            const img = document.createElement("img")
            img.src = URL.createObjectURL(file)
            img.classList.add('width-100')
            img.onload = () => {
                URL.revokeObjectURL(img.src)
            }
            if (preview) preview.appendChild(img)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }    

    const drop = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
      
        const dt = e.dataTransfer
        const files = dt.files

        // Since people can drop multiple on the element
        // Make sure it is a photo
        if (files[0]) {
            // console.log(files[0].type)
            if ((files[0].type === 'image/png') || (files[0].type === 'image/jpeg') || (files[0].type === 'image/jpg')) {
                setFile(files[0])

            } else {
                return
            }
        }
    }

    const handleRemove = () => {
        setFile(null)

        const preview = document.querySelector('#preview')
        if (preview) {
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (!file) return alert('Please select an image to upload.')
        if (!privacy) return alert('Please select a privacy option.')
        if ((privacy === 'limited') && (sharing.length < 1)) return alert('Please enter at least one person to share the image with.')
        
        console.log('Trying to upload the following to the server and cloud', 'FILE:', file, 'PRIVACY:', privacy, 'SHARING:', sharing)

        try {
            const response = await API.post('image/upload', { user, file, privacy, sharing })
            if (response.ok) {
                const data = await response.json()
                console.log(data)

            } else {
                alert('Server error. Please try again later.')
            }

        } catch (error) {
            alert('Server error. Please try again later.')

        }
    }

    const handleAddUsers = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        // Since this application is only for learning purposes we won't be doing all the checks we usually would.
        // Here we would need to check: duplicates, not the same as the current user, an actual email address, etc
        setSharing([...sharing, userEmail])

        setUserEmail('')
    }

    return (
        <>
            <section>
                <h2>Upload form</h2>
                <form>
                    <div>
                        {file
                            ?   <>
                                    <div className="flex justify-content-space-between">
                                        <button className="secondary-button" onClick={handleRemove}>Cancel</button>
                                        <button className="primary-button" onClick={handleSubmit}>Upload</button>
                                    </div>
                                    <div className='grid-row-col'>
                                        <div id="preview">
                                            {/* IMAGE LOADED HERE */}
                                        </div>
                                        <div className="flex flex-direction-column">
                                            {/* SELECT WHO CAN SEE THE PHOTO */}
                                            <div className="padding-1000">
                                                <label>Who would you like to see this upload?</label>
                                                <select
                                                    onChange={(event) => setPrivacy(event.target.value)}
                                                    required
                                                >
                                                    <option value="">Select privacy option</option>
                                                    <option value="public">Everyone</option>
                                                    <option value="limited">Only a select few</option>
                                                </select>
                                            </div>
                                            {privacy === 'limited' &&
                                                <div className="padding-1000">
                                                    <label>Which users would you like to share your photo with?</label>
                                                    <input
                                                        type="email"
                                                        placeholder="name@email.com"
                                                        value={userEmail}
                                                        onChange={(event) => setUserEmail(event.target.value)}
                                                    ></input>
                                                    <button onClick={handleAddUsers}>Add</button>
                                                    {sharing.length > 0 &&
                                                        <>
                                                            <p>Sharing with*</p>
                                                            <ul>
                                                                {sharing.map(share => {
                                                                    return <li>{share}</li>
                                                                })} 
                                                            </ul>
                                                            <p>*If they have an account on our platform.</p>
                                                        </>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </>
                            :   <div className="flex flex-direction-column align-items-center ">
                                    <div
                                        className="drag-drop width-100" 
                                        onDrop={e => drop(e)}
                                        onDragOver={e => drop(e)}
                                        onDragEnter={e => drop(e)}
                                        onDragLeave={e => drop(e)}
                                    >
                                        <p>Drag and drop a photo here</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        id="fileElem" 
                                        name="file" 
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleFileChange}
                                        className="visually-hidden"
                                    />
                                    {/* IMPROVE STYLING */}
                                    <label htmlFor="fileElem" className="primary-button">Select some files</label>
                                </div>
                        }
                    </div>
                </form>
            </section>
            <section>
                <h2>Your uploads</h2>

            </section>
        </>
    )
}