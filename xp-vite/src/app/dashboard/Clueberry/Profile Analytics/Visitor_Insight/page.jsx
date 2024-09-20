import { useForm } from "react-hook-form"
import GenderAndAge_Chart from "../Charts/Gender_and_Age_Chart"
import "./styles.scss"
import BackButton from "@/components/ui/BackButton"
import { fetch_VisitorInsight, get_Acitve_Filtered_Visitors_Profiles } from "@/api/Clueberry/api";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-amber/theme.css";
import { Dropdown } from 'primereact/dropdown';


const init = [
    {
        age_groups: [
            { age_group: "15-20", count: 0 },
            { age_group: "20-25", count: 0 },
        ],
        total_count: 0,
        gender: "male",
    },
    {
        age_groups: [
            { age_group: "15-20", count: 0 },
            { age_group: null, count: 0 },
        ],
        total_count: 0,
        gender: "other",
    },
    {
        age_groups: [
            { age_group: "20-25", count: 0 },
            { age_group: null, count: 0 },
        ],
        total_count: 0,
        gender: "female",
    },
];


const Visitor_Insight_Page = () => {
    const [chartData, setChartData] = useState(init);
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            "travel_by": "",
            "vehicle_brand": "",
            "color_liked": "",
            "visited_with": "",
            "beverage_Preference": "",
            "language_Spoken": ""
        }
    })

    const get_VisitorProfiles_GraphData = async (data) => {
        setIsLoading(true)
        try {
            const res = await fetch_VisitorInsight(data)
            if (res.data.success) {
                if (res.data.data.length === 0) {
                    toast.info("Data Not Found")
                    if (res.data.filters.length > 0) {
                        setFilters(res.data.filters)
                    }
                }
                else {
                    setChartData(res.data.data)
                }
            }
        } catch (error) {
            toast.error(error.message)
            setIsError(true)
        }
        setIsLoading(false)
    }

    const Graph = useMemo(() => {
        return (
            <GenderAndAge_Chart
                isError={isError}
                isLoading={isLoading}
                chartData={chartData}
            />
        );
    }, [chartData, isLoading, isError]);

    useEffect(() => {
        get_VisitorProfiles_GraphData()
    }, [])


    const fetch_VisitorProfiles_Filtered_GraphData = async (data) => {
        setIsLoading(true)
        try {
            if (data?.travel_By && data?.travel_By === "") {
                data.vehicle_brand = ""
            }
            const res = await get_Acitve_Filtered_Visitors_Profiles(data)
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
                {filters.length > 0 && <form onSubmit={handleSubmit(fetch_VisitorProfiles_Filtered_GraphData)} className="row">
                    {filters.map((filter, i) => (
                        <Fragment key={i}>
                            <FilterComponent filter={filter} setValue={setValue} register={register} />
                        </Fragment>)
                    )}
                    <Button size="small" icon="pi pi-search" label="Find"
                        style={{ fontWeight: "600", backgroundColor: "var(--star-color)", color: "var(--main-Bg)" }} className="pr" />
                </form>}
            </div>
            {Graph}
        </div>
    )
}
const FilterComponent = ({ filter, register, setValue }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const selectedFilter = filter.values.find(val => val.value === selectedValue);
    const hasChildren = selectedFilter ? selectedFilter.children : null;

    useEffect(() => {
        setValue(filter.register_key, selectedValue)
    }, [selectedValue])
    return (
        <>
            <div className="col">
                <div className="p-inputgroup flex-1">
                    <Dropdown
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        options={filter.values} optionLabel="label"
                        optionValue="value"
                        pt={{ list: { className: "pr" } }}
                        placeholder={filter.label} className="pr" />
                    <Button onClick={() => setSelectedValue("")} type="reset" size="small" icon="pi pi-filter-slash"
                        style={{ fontWeight: "600", backgroundColor: "var(--star-color)", color: "var(--main-Bg)" }} className="pr" />
                </div>
            </div>
            {selectedValue && hasChildren && (
                <FilterComponent filter={hasChildren} setValue={setValue} register={register} />
            )}
        </>
    );
};

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