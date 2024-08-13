import React, { useState } from 'react'
import "./styles.scss"
import { toast } from 'react-toastify'
import { generateAddStaffTokenHandler } from "@/api/User_Management/api"
import BackButton from "@/components/ui/BackButton";

const CreateStaffTokenPage = () => {
    const [value, setValue] = useState("")
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)


    async function tokenHandler() {
        if (value == "") return
        setLoading(true)
        try {
            const res = await generateAddStaffTokenHandler({ email: value })
            if (res.data.success) {
                setToken(res.data.data)
                toast.success("Successfully Created Token")
            }
            else {
                toast.error(res.data.data)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }


    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(token)
            .then(() => {
                toast.success("Token copied to clipboard!");
            })
            .catch((error) => {
                toast.error("Failed to copy token: " + error.message);
            });
    };

    return (
        <div className='CreateStaffToken'>
            <BackButton href="/dashboard/User_Management/" />
            <div className="header">
                <h1>Create Staff Token</h1>
            </div>
            <div className="form">
                <div className="flex">
                    <input type="email"
                        onChange={(e) => setValue(e.target.value)}
                        value={value} placeholder='Enter Staff Email...' />
                    <button onClick={tokenHandler} className='start p-0'>
                        {loading ? <i className='pi pi-spin pi-spinner'></i> : "Generate Token"}
                    </button>
                </div>
                {token && <div className="flex">
                    <h3>Token</h3>
                    <textarea rows={3} type="text" disabled value={token} />
                    <button className='start p-0' onClick={copyTokenToClipboard}>
                        Copy Token
                    </button>
                    {/* <button className='start p-0'>
                        {loading ? <i className='pi pi-spin pi-spinner'></i> :
                            "Send Token via Email to Staff"}</button> */}
                </div>}
            </div>
        </div>
    )
}

export default CreateStaffTokenPage