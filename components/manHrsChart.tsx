import React, { useState, useEffect } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         

import { Chart } from 'primereact/chart';

type Task = {
    id: string;
    name: string;
    username: string;
    hours: string;
    members: string[];
    project: string;
    dueDate: string;
    completed: boolean;
    completionDate: string;
    manhours: string;
    projectsId: string;
}

export default function MyDemo(){
    const [tasks, setTasks] = useState<Task[]>([]);
    
    const [selectedCity, setSelectedCity] = useState(null);
    
    const cities = [
    {
        label: 'All', code: 'all',
        items: [
            { label: 'All', value: 'all' }
        ]
    },
    {
        label: 'Projects', code: 'projects',
        items: [
            { label: 'Project 1', value: 'project1' },
            { label: 'Project 2', value: 'project2' },
            { label: 'Project 3', value: 'project3' },
            { label: 'Project 4', value: 'project4' }
        ]
    },
    {
        label: 'Employee', code: 'Emp',
        items: [
            { label: 'Caroline Tew', value: 'caroline' },
            { label: 'Charlotte Burns', value: 'charlottebruns' },
            { label: 'Jeffrey Williams', value: 'jeffery' },
            { label: 'Donald Brand', value: 'donald' }
        ]
    }
];
 


    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    function cityChange(filter: any, tasks: any){
        setSelectedCity(filter);
        console.log(filter);
        console.log(tasks);

        var xAxis =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var manHrsExpList = [];
        var manHrsActList = [];
        var manHrsExp=0;
        var manHrsAct=0;

        for(let i =0; i<xAxis.length; i++){
            for (let j =0; j<tasks.length; j++){
                // console.log(tasks[j].dueDate.slice(5,7) == xAxis[i]);
                console.log(tasks[j].dueDate.slice(5,7));
                if(filter == "all" || tasks[j].projectsId == filter || tasks[j].members[0].username == filter){
                    if(tasks[j].completed && tasks[j].completionDate.slice(5,7) == xAxis[i]){
                        manHrsAct+=tasks[j].hours;
                    }
                    if(tasks[j].dueDate.slice(5,7)== xAxis[i]){
                        manHrsExp+=tasks[j].hours;
                    }
                }
            }
            manHrsExpList.push(manHrsExp);
            manHrsActList.push(manHrsAct);
            manHrsExp = 0;
            manHrsAct = 0;
        }
        console.log(manHrsExpList);
        console.log(manHrsActList);


        const change_data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: manHrsExpList,
                    fill: false,
                    // borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: manHrsActList,
                    fill: false,
                    // borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        // make sql query
        setChartData(change_data);
    }

    useEffect(() => {
        fetch("/api/taskData").then((response)=>response.json()).then((data)=>setTasks(data))
        const select = document.getElementById("chartSelect");
//         select?.addEventListener("change", () => {
//             // setSelectedCity(select)

//         // can call other functions within this that maybe you want to separate out
//         console.log("Select changed");
//     });
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        // const temp_data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //         {
        //             label: 'First Dataset',
        //             data: [65, 59, 80, 81, 56, 55, 40],
        //             fill: false,
        //             borderColor: documentStyle.getPropertyValue('--blue-500'),
        //             tension: 0.4
        //         },
        //         {
        //             label: 'Second Dataset',
        //             data: [28, 48, 40, 19, 86, 27, 90],
        //             fill: false,
        //             borderColor: documentStyle.getPropertyValue('--pink-500'),
        //             tension: 0.4
        //         }
        //     ]
        // };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        // setChartData(temp_data);
        setChartOptions(options);
    }, []);

    return (
        <>
             <div className="card flex justify-content-center">
            <Dropdown id="chartSelect" value={selectedCity} onChange={(e) => cityChange(e.value, tasks)} options={cities} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" filter showClear filterBy="label"
                placeholder="Select" className="w-full md:w-14rem" />
            </div>
            <div className="card">
                <Chart type="line" data={chartData} options={chartOptions} />
            </div>
        </>
    )
}