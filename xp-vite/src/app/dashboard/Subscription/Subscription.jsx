/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
// import axios from "axios"
import { load } from '@cashfreepayments/cashfree-js'
import { createPaymentOrder, verifyPaymentApi } from "@/api/Main_Api";

import Custom_Centered_DynamicDialog from "@/components/ui/Dialog/Center_Dialog";
import { subscriptionPacks } from '@/utils/SubPacks';
import "./styles.scss"
import { toast } from 'react-toastify';
import BackButton from "@/components/ui/BackButton"
import InfoRender from './InfoRender';


function Subscription() {

    const [cashfree, setCashfree] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let insitialzeSDK = async function () {
            const res = await load({
                mode: "sandbox",
            })
            setCashfree(res)
        }
        insitialzeSDK()
    }, [])

    const getSessionId = async (pack) => {
        try {
            let res = await createPaymentOrder({ pack })
            if (res.data && res.data.payment_session_id) {
                return {
                    sessionId: res.data.payment_session_id,
                    orderId: res.data.order_id
                }
            }
        } catch (error) {
            toast.error("Payment Order Failed")
            console.log(error.message)
        }
    }

    const verifyPayment = async (orderId) => {
        try {
            setLoading(true)
            let res = await verifyPaymentApi({ orderId })
            if (res && res.data) {
                console.log("Response ==>", res);
                if (res.data.length > 0) {
                    const x = res.data.some((order, i) => order.payment_status == "SUCCESS")
                    if (x) {
                        toast.success("Payment Successfull")
                    }
                    else {
                        toast.error("Payment failed")
                    }
                }
                else {
                    toast.error("Payment " + res.data?.payment_status || "failed")
                }
            }
        } catch (error) {
            console.log(error.message)
            toast.info("payment verification failed")
        }
        setLoading(false)
    }

    const handleClick = async (pack) => {
        try {
            let { sessionId, orderId } = await getSessionId(pack)
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            }

            cashfree.checkout(checkoutOptions).then(async (res) => {
                toast.info("Checking Payment Status...")
                if (res?.error?.code) {
                    toast.error(res?.error?.code)
                } else {
                    await verifyPayment(orderId)
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="SubsPage">
            <BackButton href="/dashboard" />
            {loading && <div className="loadingLayer">
                <h3>
                    Loading and Verifying Payment. Please wait and do not close or refresh this page.
                </h3>
                <p>
                    If it takes too long, you can check your subscription status in the <a href="/dashboard/profile">Profile</a>
                </p>
            </div>}

            <div className="Subscription">
                <div id='heading'>CHOOSE YOUR <span>SUBSCRIPTION</span></div>{" "}
                <div className="Subscription__container">
                    {subscriptionPacks.map((subs, i) => {
                        return (
                            <div
                                className={`item`}
                                key={i}
                            >
                                <div className="right">
                                    <h3>{subs.name}</h3>
                                    <p>{subs.price}</p>
                                    <Custom_Centered_DynamicDialog
                                        label="info"
                                        dialogStyles={{ width: "max-content" }}
                                        boxStyles={{
                                            backgroundColor: "rgb(91 90 90 / 80%)", borderRadius: "10px", padding: "1rem",
                                            maxWidth: "600px",
                                            width: "90%",
                                            justifyContent: "flex-start"
                                        }}
                                        LabelChildren={() => <i className="pi pi-info-circle"></i>}
                                    >
                                        <div className="dialog-content">
                                            <InfoRender subs={subs} />
                                        </div>
                                    </Custom_Centered_DynamicDialog>
                                    {/* <i className="pi pi-info-circle"></i> */}
                                </div>
                                <div className="left">
                                    <button onClick={() => handleClick(subs.name)} className='start'>Buy</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Subscription
