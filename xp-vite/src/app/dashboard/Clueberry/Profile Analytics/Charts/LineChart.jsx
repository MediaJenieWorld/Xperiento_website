
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
import { fetch_getAgeGroup } from "@/api/Clueberry/api";
import { toast } from 'react-toastify';


const init = [
    {
        "count": 0,
        "age_group": null
    },
    {
        "count": 0,
        "age_group": "audi"
    },
    {
        "count": 0,
        "age_group": "mercedes"
    },
    {
        "count": 0,
        "age_group": "bmw"
    },
    {
        "count": 0,
        "age_group": "jaguar"
    }
]

const labels = ["0", "15-20", "20-25", "25-30", "30-35", "35-40", "40-45", "45-50", "50-55", "55-60"]
const Line_Chart
    = () => {
        const [chartData, setChartData] = useState(init);
        const [isLoading, setIsLoading] = useState(true);
        const [isError, setIsError] = useState(false);

        async function getBrandsChartData() {
            try {


                const res = await fetch_getAgeGroup()
                if (res.data.success) {
                    setChartData(res.data.data)
                }
            } catch (error) {
                toast.error(error.message)
                setIsError(true)
            }
            setIsLoading(false)
        }

        useEffect(() => {
            getBrandsChartData()
        }, []);

        if (isLoading) {
            return <p>Vehicle Brands Used Chart is Loading...</p>
        }

        if (isError) {
            return <p>Error Occured</p>
        }

        const output = chartData.reduce((acc, item) => {
            if (item.age_group) {
                acc[`${item.age_group}`] = item.counts;
            }
            return acc;
        }, {});
        const data = {
            labels: labels.map((brand) => `${brand}`),
            datasets: [
                {
                    label: 'Age Group',
                    data: labels.map((val) => output[val] ? output[val] : 0),
                    backgroundColor: "#ff0000",
                    borderColor: "#ff0000",
                    borderWidth: 3,
                }
            ],
        };


        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Age group interested in us',
                },
            },
        };

        return (
            <div className="card">
                <Chart type="line" data={data} options={options} />
            </div>
        )
    }

export default Line_Chart
