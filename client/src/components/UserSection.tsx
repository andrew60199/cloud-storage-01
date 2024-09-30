import type { User } from "../util/models"

import UploadForm from "./UploadForm"

export default function UserSection ({ user, baseURL }: { user: User | null, baseURL: string }) {
    
    return (
        <>
            <UploadForm user={user} baseURL={baseURL} />
            <section>
                <h2>Your uploads</h2>

            </section>
        </>
    )
}