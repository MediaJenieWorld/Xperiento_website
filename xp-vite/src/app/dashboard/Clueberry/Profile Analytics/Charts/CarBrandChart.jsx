
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
import { fetch_Vehicle_Brand } from '@/api/Clueberry/api';
import { toast } from 'react-toastify';

const init = [
    {
        "count": 0,
        "Vehicle_Brand": null
    },
    {
        "count": 0,
        "Vehicle_Brand": "audi"
    },
    {
        "count": 0,
        "Vehicle_Brand": "mercedes"
    },
    {
        "count": 0,
        "Vehicle_Brand": "bmw"
    },
    {
        "count": 0,
        "Vehicle_Brand": "jaguar"
    }
]

const labels = [
    "toyota",
    "tesla",
    "honda",
    "ford",
    "hyundai",
    "ram",
    "bmw",
    "kia"
]

const backgroundColor = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    "#800000",
    "#ff0000",
    "#ee82ee",
    "#36454f",
    "#ff00ff"
]


const CarBrand_Chart = () => {
    const [chartData, setChartData] = useState(init);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    async function getBrandsChartData() {
        try {
            const res = await fetch_Vehicle_Brand()
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
        if (item.Vehicle_Brand) {
            acc[item.Vehicle_Brand] = item.count;
        }
        return acc;
    }, {});


    const data = {
        labels: labels.map((brand) => `${brand.toUpperCase()}`),
        datasets: [
            {
                label: 'Vehicle Brands Used',
                data: labels.map((val) => output[val] ? output[val] : 0),
                backgroundColor: backgroundColor,
                borderWidth: 1,
            }
        ],
    };
    return (
        <div className="card">
            <Chart type="bar" data={data} options={{
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Customers Vehicle Brand',
                    },
                },
            }
            } />
        </div>
    )
}

export default CarBrand_Chart
