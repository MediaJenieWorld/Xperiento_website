import React, { useEffect, useRef, useState } from 'react'
import "./styles.scss"
import { toast } from 'react-toastify'
import { generateAddStaffTokenHandler } from "@/api/User_Management/api"
import BackButton from "@/components/ui/BackButton";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Dialog } from 'primereact/dialog';


const CreateStaffTokenPage = () => {
    const [value, setValue] = useState("")
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const stepperRef = useRef(null);
    const [visible, setVisible] = useState(false);

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

    useEffect(() => {
        if (token !== "") {
            stepperRef.current.nextCallback()
        }
    }, [token])

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(token)
            .then(() => {
                toast.success("Token copied to clipboard!");
            })
            .catch((error) => {
                toast.error("Failed to copy token: " + error.message);
            });
    };

    const modelToggler = () => setVisible(pre => !pre)

    return (
        <div className='CreateStaffToken'>
            <BackButton href="/dashboard/User_Management/" />
            <div className="form">
                <Stepper className="pr" ref={stepperRef} >
                    <StepperPanel header="Create Staff Token">
                        <div className="content-wrapper">
                            <div className="flex w-full pr p-inputgroup flex-1">
                                <InputText type="email" keyfilter="email"
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value} placeholder='Enter Staff Email...' />
                                <Button onClick={tokenHandler} className='p-inputgroup-addon p-0'>
                                    {loading ? <i className='pi pi-spin pi-spinner'></i> : "Send invite"}
                                </Button>
                            </div>
                        </div>
                    </StepperPanel>
                    {token !== "" && <StepperPanel header="Token Generated">
                        <div className="content-wrapper">
                            <InputTextarea className='pr' style={{ width: "100%", margin: "1rem 0" }} autoResize disabled value={token} readOnly rows={3} cols={30} />
                            <div className="footer">
                                <Button size='Small' icon="pi pi-clipboard" className='pr' label='Copy Token' onClick={copyTokenToClipboard} />
                                <Button severity='secondary' icon="pi pi-sparkles"
                                    label='Create New Staff Token'
                                    size='Small' className='pr ' onClick={() => { window.location.reload() }} />
                            </div>
                        </div>

                    </StepperPanel>}
                </Stepper>
                <div className="footer">

                    <Button severity='help' iconPos='right' icon="pi pi-question-circle"
                        label='Tutorial'
                        onClick={modelToggler}
                        size='Small' className="pr" />
                </div>
            </div>

            <Dialog header="Tutorial" visible={visible} position={"bottom"} style={{ width: '90vw' }}
                className='pr'
                onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>
                <div className="m-0">
                    <h3>
                        To create your staff token, please follow these simple steps:
                    </h3>
                    <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", }}>
                        <li>
                            Enter your email address in the designated field.
                        </li>
                        <li>
                            Click on the "Generate Token" button.
                        </li>
                        <li>
                            Once the token is generated, it will be automatically sent to the Staff email.
                        </li>
                        <li>
                            Alternatively, you can copy the token directly from the "Token Generated" section on the page.
                        </li>
                        <li>Paste the token into the 'Business Name' field while creating your account</li>
                    </ol>
                </div>
            </Dialog>
        </div>
    )
}

export default CreateStaffTokenPage