import { useEffect, useState } from "react";
import "./styles.scss"
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import reviewData from "@/api/reviews.json";

import { Rating } from "primereact/rating";

import Sentiment from 'sentiment';
const sentiment = new Sentiment();

const Reputation_management = () => {
    const [tutorialModel, setTutorialModel] = useState(false);
    const [value, setValue] = useState(null);
    const [urlModel, setUrlModel] = useState(false);
    const [data, setData] = useState(null);
    const [amazon_review_Data, setAmazon_review_Data] = useState({
        positive: "Loading",
        negative: "Loading",
        neutral: "Loading"
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
        let getAllReview = []
        for (let index = 0; index < data?.length; index++) {
            const emotion = sentiment.analyze(data[index].content)
            const output = getSentimentLabel(emotion.score)
            getAllReview.push(output)
        }

        const positive = getAllReview.filter(val => val === "Positive").length
        const negative = getAllReview.filter(val => val === "Negative").length
        const neutral = getAllReview.filter(val => val === "Neutral").length
        return {
            positive,
            negative,
            neutral
        }
    }
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
                <div className="p-inputgroup flex-1">
                    <InputText placeholder="Enter url here..." />
                    <Button icon="pi pi-send" />
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
                <div className="card">
                    <i className="pi pi-amazon"></i>
                    <p>Horrible product. Bad packaging. Wont recommend to anyone.</p>
                </div>

                <div className="card">
                    <i className="pi pi-facebook"></i>
                    <p>Great service.
                        My issue was solved in 5 minutes. Excellent</p>
                </div>
                <div className="card">
                    <i className="pi pi-amazon"></i>
                    <p>
                        Good quality product.
                        Bad packaging and delivery.
                    </p>
                </div>

            </div>

            <div className="review-cards">
                <div className="card">
                    <div className="top">
                        <i className="pi pi-amazon"></i>
                        <p>{data?.length} Reviews</p>
                        <div className="stars">
                            <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="review-cat">
                            <h4>Positive Reviews {amazon_review_Data?.positive} </h4>
                            <h4>Negative Reviews {amazon_review_Data?.negative} </h4>
                            <h4>Neutral Reviews {amazon_review_Data?.neutral} </h4>
                        </div>
                        <button>View All Reviews</button>
                    </div>
                </div>
                <div className="card">
                    <div className="top">
                        <i className="pi pi-facebook"></i>
                        <p>876 Reviews</p>
                        <div className="stars">
                            <Rating value={0} cancel={false} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="review-cat">
                            <h4>Positive Reviews 859 </h4>
                            <h4>Negative Reviews 148 </h4>
                            <h4>Neutral Reviews 230 </h4>
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


export default Reputation_management