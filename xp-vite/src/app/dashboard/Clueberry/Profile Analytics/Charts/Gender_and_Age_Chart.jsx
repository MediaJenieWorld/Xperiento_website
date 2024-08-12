/* eslint-disable react/prop-types */
import { Chart } from "primereact/chart";

const labels = [
    "0",
    "15-20",
    "20-25",
    "25-30",
    "30-35",
    "35-40",
    "40-45",
    "45-50",
    "50-55",
    "55-60",
];

const backgroundColors = {
    "male": "rgba(153, 102, 255, 0.6)",
    "female": "rgba(255, 99, 132, 0.6)",
    "other": "rgba(141, 141, 141, 0.6)",
};

const GenderAndAge_Chart = ({ isError, isLoading, chartData }) => {

    if (isLoading) {
        return <p>Vehicle Brands Used Chart is Loading...</p>
    }
    if (isError) {
        return <p>Error Occured</p>
    }

    const data = {
        labels: labels.map((brand) => `${brand}`),
        datasets: chartData.map((value) => {
            const ageGroupCounts = Array(labels.length).fill(0);
            value.age_groups.forEach((ageGroup) => {
                if (ageGroup.age_group && labels.includes(ageGroup.age_group)) {
                    const ageGroupIndex = labels.indexOf(ageGroup.age_group);
                    ageGroupCounts[ageGroupIndex] = ageGroup.count;
                }
            });

            return {
                label: value.gender,
                data: ageGroupCounts,
                backgroundColor: backgroundColors[value.gender],
            };
        }),
    };
    return (
        <div className="card">
            <Chart
                type="bar"
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Age Group Distribution of Males, Females and Others",
                        },
                    },
                }}
            />
        </div>
    );
};

export default GenderAndAge_Chart;
