import { useEffect, useState } from "react";
import "./styles.scss"
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import reviewData from "@/api/amazon_reviews.json";
import { Checkbox } from 'primereact/checkbox';
import { Rating } from "primereact/rating";

import Sentiment from 'sentiment';
const sentiment = new Sentiment();

const Reputation_management = () => {
    const [tutorialModel, setTutorialModel] = useState(false);
    const [urlModel, setUrlModel] = useState(false);
    const [data, setData] = useState(null);
    const [amazon_review_Data, setAmazon_review_Data] = useState({
        positiveReview: { content: "Loading", numbers: "Loading" },
        negativeReview: { content: "Loading", numbers: "Loading" },
        neutralReview: { content: "Loading", numbers: "Loading" },
    });

    useEffect(() => {
        getDataHandler()
        if (window) {
            setTimeout(() => {
                setTutorialModel(true)
            }, 1200);
        }
    }, [])

    useEffect(() => {
        if (data) {
            setAmazon_review_Data(renderEmotionBody())
        }
    }, [data])


    async function getDataHandler(url) {
        const res = reviewData
        if (res.length > 0) {
            setData(res)
        }
    }

    function renderEmotionBody() {
        let totalRating = 0;
        let positiveReview = {
            numbers: 0,
            content: ""
        }
        let negativeReview = {
            numbers: 0,
            content: ""
        }
        let neutralReview = {
            numbers: 0,
            content: ""
        }
        for (let index = 0; index < data?.length; index++) {
            totalRating += Number(data[index]?.rating);
            const emotion = sentiment.analyze(data[index].content)
            const output = getSentimentLabel(emotion.score)
            if (output === "Negative") {
                negativeReview.numbers += 1
                negativeReview.content = data[index]?.content
            }
            else if (output === "Positive") {
                positiveReview.numbers += 1
                positiveReview.content = data[index]?.content
            }
            else if (output === "Neutral") {
                neutralReview.numbers += 1
                neutralReview.content = data[index]?.content
            }

        }
        const AvgRating = totalRating / data.length;
        return {
            averageRating: AvgRating.toFixed(2),
            positiveReview,
            negativeReview,
            neutralReview
        }
    }
    console.log(amazon_review_Data);


    return (
        <div className='Reputation_management'>
            <Dialog header="" visible={tutorialModel} position={"center"} style={{ width: '90vw' }}
                className='pr'
                onHide={() => {
                    if (!tutorialModel) return;
                    setTutorialModel(false);
                }} draggable={false} resizable={false}>
                <div className="m-0">
                    <h3>
                        Click on <span style={{ color: "var(--star-color)" }}>Add New URL to track</span>
                    </h3>
                </div>
            </Dialog>
            <Dialog header="Add New URL To Track" visible={urlModel} position={"center"} style={{ width: '90vw' }}
                className='pr'
                onHide={() => { if (!urlModel) return; setUrlModel(false); }} draggable={false} resizable={false}>
                <div className="text-input-wrapper">
                    <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }} className="box">
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingLeft: "8px" }} className="text-input-header">
                            {/* <Checkbox /> */}
                            <label htmlFor="Amazon">Amazon </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputText placeholder="Enter url here..." />
                            <Button icon="pi pi-send" />
                        </div>
                    </div>
                    <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: ".5rem" }} className="box">
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingLeft: "8px" }} className="text-input-header">
                            {/* <Checkbox /> */}
                            <label htmlFor="Google">Google </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputText placeholder="Enter url here..." />
                            <Button icon="pi pi-send" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className="header">
                <h1>Brand Reputation Dashboard</h1>
                <button className="start p-0" onClick={() => setUrlModel(true)}>
                    {/* <a style={{ color: "var(--main-Bg)", textDecoration: "none" }} href="/dashboard/Reputation_management/new-track"> */}
                    Add New URL to track
                    {/* </a> */}
                </button>
            </div>
            <h3>Latest Reviews</h3>
            <div className="cards">
                <div className="card neutral">
                    <i className="pi pi-amazon"></i>
                    <p>{amazon_review_Data?.neutralReview?.content || "Good quality product. Bad packaging and delivery."} </p>
                </div>
                <div className="card positive">
                    <i className="pi pi-amazon"></i>
                    <p>{amazon_review_Data?.positiveReview?.content || "Great service. My issue was solved in 5 minutes. Excellent"}</p>
                </div>
                <div className="card negative">
                    <i className="pi pi-amazon"></i>
                    <p>{amazon_review_Data?.negativeReview?.content || "Horrible product. Bad packaging. Wont recommend to anyone."}</p>
                </div>
            </div>
            <div className="review-cards">
                <div className="card">
                    <div className="top">
                        <i className="pi pi-amazon"></i>
                        <p>{data?.length} Reviews</p>
                        <div className="stars">
                            <Rating value={Math.floor(amazon_review_Data?.averageRating) || 0} cancel={false} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="review-cat">
                            <h4>Positive Reviews {amazon_review_Data?.positiveReview.numbers} </h4>
                            <h4>Negative Reviews {amazon_review_Data?.negativeReview.numbers} </h4>
                            <h4>Neutral Reviews {amazon_review_Data?.neutralReview.numbers} </h4>
                        </div>
                        <button>View All Reviews</button>
                    </div>
                </div>
                <div className="card">
                    <div className="top">
                        <i className="pi pi-google"></i>
                        <p>0 Reviews</p>
                        <div className="stars">
                            <Rating value={0} cancel={false} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="review-cat">
                            <h4>Positive Reviews 0 </h4>
                            <h4>Negative Reviews 0 </h4>
                            <h4>Neutral Reviews 0 </h4>
                        </div>
                        <button>View All Reviews</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const getSentimentLabel = (score) => {
    if (score > 0) {
        return 'Positive';
    } else if (score === 0) {
        return 'Neutral';
    } else if (score >= -5) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
};

function getAverageRating(ratings) {
    if (!Array.isArray(ratings) || ratings.length === 0) {
        return 0; // Return 0 for empty or invalid input
    }

    const total = ratings.reduce((sum, item) => {
        const ratingValue = parseFloat(item.rating); // Convert string to float
        return sum + (isNaN(ratingValue) ? 0 : ratingValue); // Add to sum, handle NaN
    }, 0);

    const average = total / ratings.length;

    return average;
}

export default Reputation_management