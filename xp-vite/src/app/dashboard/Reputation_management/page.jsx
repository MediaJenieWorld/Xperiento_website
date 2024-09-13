import "./styles.scss"

const Reputation_management = () => {
    return (
        <div className='Reputation_management'>
            <div className="header">
                <h1>Brand Reputation Dashboard</h1>
                <button className="start p-0">
                    <a style={{ color: "var(--main-Bg)", textDecoration: "none" }} href="/dashboard/Reputation_management/new-track">
                        Add New URL to track
                    </a>
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
                        <p>1346 Reviews</p>
                        <div className="stars">
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
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
                <div className="card">
                    <div className="top">
                        <i className="pi pi-facebook"></i>
                        <p>876 Reviews</p>
                        <div className="stars">
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
                            <i className="pi pi-star"></i>
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

export default Reputation_management