import { useForm } from "react-hook-form"
import GenderAndAge_Chart from "../Charts/Gender_and_Age_Chart"
import "./styles.scss"
import BackButton from "@/components/ui/BackButton"
import { fetch_VisitorInsight } from "@/api/Clueberry/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const init = [
    {
        age_groups: [
            { age_group: "15-20", count: 1 },
            { age_group: "20-25", count: 1 },
        ],
        total_count: 2,
        gender: "male",
    },
    {
        age_groups: [
            { age_group: "15-20", count: 1 },
            { age_group: null, count: 1 },
        ],
        total_count: 2,
        gender: "other",
    },
    {
        age_groups: [
            { age_group: "20-25", count: 4 },
            { age_group: null, count: 1 },
        ],
        total_count: 5,
        gender: "female",
    },
];


const Visitor_Insight_Page = () => {
    const [chartData, setChartData] = useState(init);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            "travel_by": "",
            "vehicle_brand": "",
            "color_liked": "",
            "visited_with": "",
            "beverage_Preference": "",
            "language_Spoken": ""
        }
    })

    const filterSubmit = async (data) => {
        setIsLoading(true)
        try {
            const res = await fetch_VisitorInsight(data)
            if (res.data.success) {
                if (res.data.data.length === 0) {
                    toast.info("Data Not Found")
                } else {
                    setChartData(res.data.data)
                }
            }
        } catch (error) {
            toast.error(error.message)
            setIsError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        filterSubmit()
    }, [])

    return (
        <div className="Visitor_Insight_Page">
            <BackButton href="/dashboard/Clueberry/profile_analytics" />
            <br />
            <br />
            <h2 className="header">
                Clueberry Analytics {"> "}
                Visitor Insights
            </h2>
            <div className="filters">
                <form onSubmit={handleSubmit(filterSubmit)} className="row">
                    {filters().map((filter, i) => (<div key={i} className="col">
                        <select {...register(filter.id)} name={filter.name} id={filter.id}>
                            {filter.options.map((opt, key) => <option key={key} value={opt.value}>{opt.label}</option>
                            )}
                        </select>
                    </div>))}
                    <button style={{ margin: "0", padding: "5px 20px", height: "unset", width: "unset" }} className="start">Find</button>
                </form>
            </div>
            <GenderAndAge_Chart isError={isError} isLoading={isLoading} chartData={chartData} />
        </div>
    )
}

export default Visitor_Insight_Page

function filters() {
    return [{
        id: "travel_By",
        name: "travel_By", options: [
            { value: "", label: "Travel By" },
            { value: "Car", label: "Car" },
            { value: "bike", label: "Bike" },
            { value: "taxi", label: "Taxi" },
            { value: "train", label: "Train" },
            { value: "etc", label: "etc" },
        ]
    },
    {
        id: "vehicle_brand",
        name: "vehicle_brand", options: [
            { value: "", label: "Vehicle Brand" },
            { value: "bmw", label: "BMW" },
            { value: "ferrari", label: "Ferrari" },
            { value: "audi", label: "Audi" },
            { value: "etc", label: "etc" },
        ]
    },
    // {
    //     id: "color_liked",
    //     name: "color_liked", options: [
    //         { value: "", label: "Colour Liked" },
    //         { value: "red", label: "Red" },
    //         { value: "green", label: "Green" },
    //         { value: "blue", label: "Blue" },
    //         { value: "etc", label: "etc" },
    //     ]
    // },
    // {
    //     id: "Outfit_Options",
    //     name: "Outfit_Options",
    //     options: [
    //         { value: "", label: "Outfit Options" },
    //         { value: "casual", label: "Casual Outfit" },
    //         { value: "formal", label: "Formal Outfit" },
    //         { value: "sporty", label: "Sporty Outfit" }
    //     ]
    // },
    {
        id: "visited_with",
        name: "visited_with",
        options: [
            { value: "", label: "Visited With" },
            { value: "alone", label: "Alone" },
            { value: "husband/wife", label: "Husband / Wife" },
            { value: "parents", label: "Parents" },
            { value: "childrens", label: "Childrens" },
            { value: "friends", label: "Friends" }
        ]
    },
    {
        id: "beverage_Preference",
        name: "beverage_Preference",
        options: [
            { value: "", label: "Likes Tea / Coffee" },
            { value: "tea", label: "Tea" },
            { value: "coffee", label: "Coffee" },
            { value: "both", label: "Both" }
        ]
    },
    {
        id: "language_Spoken",
        name: "language_Spoken",
        options: [
            { value: "", label: "Language Spoken" },
            { value: "hindi", label: "Hindi" },
            { value: "tamil", label: "Tamil" },
            { value: "telugu", label: "Telugu" },
            { value: "english", label: "English" },
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
            { value: "etc", label: "Etc." }
        ]
    }

    ]
}