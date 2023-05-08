import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Legend } from 'chart.js';
import { Card, Text } from '@tremor/react';
Chart.register(ArcElement, Legend, Title);

interface ProjectData {
    label: string;
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string[];
        data: number[];
    }[];
}

const DonutChart = ({ projectData }: { projectData: ProjectData }) => {
    const { label, labels, datasets } = projectData;

    //text in the middle of the chart
    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart:any, args:any, pluginOptions:any) {
            const { ctx, data } = chart;

            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            //sum of all tasks
            const sum = data.datasets[0].data[0] +
                        data.datasets[0].data[1] +
                        data.datasets[0].data[2] +
                        data.datasets[0].data[3];
            ctx.fillText(`Value: ${sum}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);    
        },
    };

    return (
        <div>
            <Card className="mb-4 drop-shadow-md">
                <Text className="text-gray-800">{label}</Text>
                <Doughnut
                    data={{ labels, datasets }}
                    options={{
                        responsive: true,
                        plugins: {
                        legend: {
                            position: 'top',
                        },
                        },
                    }}
                    plugins={[textCenter]}
                    height={100}
                    width={200}
                ></Doughnut>
            </Card>
        </div>
    );
};

export default DonutChart;