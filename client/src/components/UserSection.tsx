import { useEffect, useState } from "react"

export default function UserSection () {
    const [file, setFile] = useState<File | null>(null)
    
    useEffect(() => {
        console.log(file)
        if (file) {
            handlePreview()
        }

    }, [file])

    const handlePreview = () => {
        if (file) {
            // THERE IS PROBABLY A BETTER WAY OF DOING THIS YET THIS WORKS FOR THE TIME BEING
            const preview = document.querySelector('#preview')
            const img = document.createElement("img")
            img.src = URL.createObjectURL(file)
            img.height = 400
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

    return (
        <>
            <section>
                <h2>Upload form</h2>
                <form>
                    <div>
                        {file
                            ?   <>
                                    {/* REPLACE DRAG AND DROP BOX AND BUTTON WITH IMAGE SELECTED */}
                                    <div id="preview"></div>
                                    <button onClick={handleRemove}>Cancel uploading this photo</button>
                                    
                                    {/* SELECT WHO CAN SEE THE PHOTO */}
                                    {/* SUBMIT BUTTON */}
                                </>
                            :   <>
                                    <div 
                                        className="drag-drop" 
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
                                    <label htmlFor="fileElem">Select some files</label>
                                </>
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