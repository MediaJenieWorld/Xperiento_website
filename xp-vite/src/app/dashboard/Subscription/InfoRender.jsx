import React from 'react'

const InfoRender = ({ subs }) => {
    return (
        <>

            <div className="flex-column">
                <h4>Subscription Pack Name:</h4>
                <p style={{ color: "var(--star-color)" }}>{subs.name}</p>
            </div>
            <div className="flex-column">
                <h4>Services you can access:</h4>
                <p style={{ color: "var(--star-color)" }}>{subs.description}</p>
            </div>
            {/* <div className="flex-column">
                                                <h4>Customer Profile</h4>
                                                <p style={{ color: "var(--star-color)" }}>{subs.insightLimit}</p>
                                            </div> */}
            <div className="flex-column">
                <h4>Price:</h4>
                <p style={{ color: "var(--star-color)" }}>{subs.price}</p>
            </div>
        </>
    )
}

export default InfoRender