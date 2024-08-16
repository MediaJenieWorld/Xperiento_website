
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
    const [filters, setFilters] = useState([]);
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
                    if (res.data.filters.length === 0) {
                        toast.info("Filters Not Found")
                    } else {
                        setFilters(res.data.filters)
                    }
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
                {filters.length > 0 && <form onSubmit={handleSubmit(filterSubmit)} className="row">
                    {filters.map((filter, i) => (<div key={i} className="col">
                        <select {...register(filter.register_key)} name={filter.register_key} id={filter.register_key}>
                            {filter.values.map((opt, key) => <>
                                {key === 0 &&
                                    <option key={99} value="">{filter.label}</option>
                                }
                                <option key={key} value={opt.value}>{opt.label}</option>
                            </>
                            )}
                            <p>123</p>
                        </select>
                    </div>))}
                    <button style={{ margin: "0", padding: "5px 20px", height: "unset", width: "unset" }} className="start">Find</button>
                </form>}
            </div>
            <GenderAndAge_Chart isError={isError} isLoading={isLoading} chartData={chartData} />
        </div>
    )
}

export default Visitor_Insight_Page

// function filters() {
//  return [
//     {
//         "label": "Travel By",
//         "register_key": "travel_By",
//         "values": [
//             {
//                 "label": "Car",
//                 "value": "Car"
//             },
//             {
//                 "label": "Bike",
//                 "value": "Bike"
//             },
//             {
//                 "label": "Train",
//                 "value": "train"
//             },
//             {
//                 "label": "Taxi",
//                 "value": "Taxi"
//             },
//             {
//                 "label": "etc",
//                 "value": "etc"
//             }
//         ]
//     },
//     {
//         "label": "Vehicle Brand",
//         "register_key": "vehicle_brand",
//         "values": [
//             {
//                 "label": "BMW",
//                 "value": "bmw"
//             },
//             {
//                 "label": "Mercedes",
//                 "value": "mercedes"
//             },
//             {
//                 "label": "Audi",
//                 "value": "audi"
//             },
//             {
//                 "label": "Jaguar",
//                 "value": "jaguar"
//             },
//             {
//                 "label": "etc",
//                 "value": "etc"
//             }
//         ]
//     },
//     {
//         "label": "Visiting with",
//         "register_key": "visited_with",
//         "values": [
//             {
//                 "label": "Alone",
//                 "value": "alone"
//             },
//             {
//                 "label": "Spouse",
//                 "value": "spouse"
//             },
//             {
//                 "label": "Family",
//                 "value": "family"
//             },
//             {
//                 "label": "Husband/wife",
//                 "value": "husband/wife"
//             },
//             {
//                 "label": "parents",
//                 "value": "Parents"
//             },
//             {
//                 "label": "Childrens",
//                 "value": "childrens"
//             },
//             {
//                 "label": "Friends",
//                 "value": "freinds"
//             }
//         ]
//     }
// ]
// }