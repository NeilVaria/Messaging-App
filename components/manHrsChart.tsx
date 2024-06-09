import React, { useState, useEffect } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import { ToggleButton } from 'primereact/togglebutton';
        

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         

import { Chart } from 'primereact/chart';
import { select } from "@material-tailwind/react";

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

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    image?: string;
    password: string;
}

type Project ={
    completed: boolean;
    completionDate: string;
    deadline: string;
    description: string;
    id: string;
    name: string;
}

export default function MyDemo({ projectsId }: { projectsId: string }){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedCity, setSelectedCity] = useState(null);
 
    var userItems = [];

    const [selectData, setSelectData] = useState([ {
        name: '', id: '',
    }]);
    const [checked, setChecked] = useState(false);

    // function toggle(check : any){
    //     setChecked(check);
    //     if (checked){
    //         setSelectData([
    //             {id:"all", name:"All"},
    //             ...projects]);
    //     } else {
    //         setSelectData([
    //             {id:"all", name:"All"},
    //             ...users]);
    //     }
    // }


    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    function cityChange(filter: any, tasks: any){
        setSelectedCity(filter);

        var xAxis =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var manHrsExpList = [];
        var manHrsActList = [];
        var manHrsExp=0;
        var manHrsAct=0;

        console.log(filter.id);
        for(let i =0; i<xAxis.length; i++){
            for (let j =0; j<tasks.length; j++){
                if (filter != undefined){
                if(filter.id == "all" || tasks[j].projectsId == filter.id || tasks[j].members[0].id == filter.id){
                    if(tasks[j].completed && tasks[j].completionDate!=null && tasks[j].completionDate.slice(5,7) == xAxis[i]){
                        manHrsAct+=tasks[j].hours;
                    }
                    if(tasks[j].dueDate.slice(5,7)== xAxis[i]){
                        manHrsExp+=tasks[j].hours;
                    }
                }
            }
            }
            manHrsExpList.push(manHrsExp);
            manHrsActList.push(manHrsAct);
            manHrsExp = 0;
            manHrsAct = 0;
        }

        const change_data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Expected Manhours',
                    data: manHrsExpList,
                    fill: false,
                    // borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Actual Manhours',
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
        Promise.all([
            fetch("/api/taskData").then((response) => response.json()),
            fetch("/api/userData").then((response) => response.json()),
            fetch("/api/projectData").then((response) => response.json())
          ]).then(([taskData, userData, projectData]) => {
            setTasks(taskData);
            setUsers(userData);
            setProjects(projectData);
            if(projectsId=="all"){
                setSelectData([
                    {id:"all", name:"All"}]);
                const select = document.getElementById("chartSelect");
                if(select){
                    select.style.display = "none";
                }
                cityChange({id:"all", name:"All"}, taskData);

            }else{
                const filteredUsers = userData.filter((user:any) => taskData.some((task:any) => task.projectsId === projectsId && task.members[0].id === user.id));
                for (let p =0; p<projectData.length; p++){
                    if(projectData[p].id==projectsId){
                        setSelectData([projectData[p], ...filteredUsers]);
                        break;
                    }
                }
            }

            // setSelectData([
            //     {id:"all", name:"All"},
            //     ...projectData]);
          });
        const select = document.getElementById("chartSelect");
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
                 {/* <ToggleButton id="toggle" checked={checked} onLabel="Users" offLabel="Projects "onChange={(e) => toggle(e.value)}/> */}
                <Dropdown id="chartSelect" value={selectedCity} onChange={(e) => cityChange(e.value, tasks)} options={selectData} optionLabel="name" filter showClear filterBy="name"
                placeholder="Select" className="w-full md:w-14rem" />
            </div>
            <div className="card">
                <Chart type="line" data={chartData} options={chartOptions} />
            </div>
        </>
    )
}