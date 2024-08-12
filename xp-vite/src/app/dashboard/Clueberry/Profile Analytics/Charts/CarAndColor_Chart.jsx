
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
import { fetch_getCars_Color } from '@/api/Clueberry/api';
import { toast } from 'react-toastify';


const init = [
    {
        "count": 0,
        "color": null
    },
    {
        "count": 0,
        "color": "audi"
    },
    {
        "count": 0,
        "color": "mercedes"
    },
    {
        "count": 0,
        "color": "bmw"
    },
    {
        "count": 0,
        "color": "jaguar"
    }
]

const labels = ["white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "black"];

const backgroundColor = [
    "rgb(169 165 165)", // white
    "rgb(255, 0, 0)",     // red
    "rgb(0, 0, 255)",     // blue
    "rgb(0, 255, 0)",     // green
    "rgb(255, 255, 0)",   // yellow
    "rgb(255, 165, 0)",   // orange
    "rgb(128, 0, 128)",   // purple
    "rgb(255, 192, 203)",  // pink
    "rgb(0 0 0)"
]

const CarsAndColors_Chart = () => {
    const [chartData, setChartData] = useState(init);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    async function getBrandsChartData() {
        try {
            const res = await fetch_getCars_Color()
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
        if (item.color) {
            acc[item.color] = item.counts;
        }
        return acc;
    }, {});


    const data = {
        labels: labels.map((brand) => `${brand.toUpperCase()}`),
        datasets:
            [{
                label: 'Vehicle Brands Used',
                data: labels.map((val) => output[val] ? output[val] : 0),
                backgroundColor: backgroundColor,
                borderWidth: 1,
            }]
    };

    return (
        <div className="card">
            <Chart type="bar" data={data} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Mostly used car colors',
                    },
                },
            }} />
        </div>
    )
}

export default CarsAndColors_Chart