
import CarBrand_Chart from "./Charts/CarBrandChart"
import CarsAndColors_Chart from "./Charts/CarAndColor_Chart"
import Line_Chart from "./Charts/LineChart"
import "./styles.scss"
import BackButton from "@/components/ui/BackButton"
import "primereact/resources/themes/lara-light-amber/theme.css";


const Profile_Analytics = () => {
    return (
        <div className="Profile_Analytics">
            <BackButton href="/dashboard/Clueberry" />
            <div className="chart-container">
                <CarsAndColors_Chart />
                <Line_Chart />
                <CarBrand_Chart />
                <a href="/dashboard/Clueberry/profile_analytics/visitor_insight" className="box">
                    <LongArrow />
                    Visitor Insight
                </a>
            </div>
        </div>
    )
}

function LongArrow() {
    return (
        <svg
            width="35"
            height="10"
            viewBox="3 0 35 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M34 5L34.3536 2.64645L34.7071 5L34.3536 5.35355L34 5ZM1 5.5C0.723858 5.5 0.5 5.27614 0.5 5C0.5 4.72386 0.723858 4.5 1 4.5V5.5ZM30.3536 0.646447L34.3536 4.64645L33.6464 5.35355L29.6464 1.35355L30.3536 0.646447ZM34.3536 5.35355L30.3536 9.35355L29.6464 8.64645L33.6464 4.64645L34.3536 5.35355ZM34 5.5H24.5V4.5H34V5.5ZM24.5 5.5H12.75V4.5H24.5V5.5ZM12.75 5.5H1V4.5H12.75V5.5Z"
                fill="#fff"
            />
        </svg>
    );
}



export default Profile_Analytics


