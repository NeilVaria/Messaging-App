import React, { useState, useEffect } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import { ToggleButton } from 'primereact/togglebutton';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         

import { Chart } from 'primereact/chart';
import { select } from "@material-tailwind/react";
import { compileFunction } from "vm";
import { ro } from "date-fns/locale";
import router from "next/router";

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

interface ColumnMeta {
    field: string;
    header: string;
}

export default function EmpTblSingle({ projectsId }: { projectsId: string }){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [products, setProducts] = useState<User[]>([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const columns: ColumnMeta[] = [
        {field: 'name', header: 'Name'},
    ];

    function empSelect(emp: any){
        router.push(`/employees/${emp.id}`);
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

            console.log("Task Data", taskData)
            
            const projectId = projectsId; //FOR CHARLOTTE Replace the string with the variable that has the project id in it
            const filteredUsers = userData.filter((user:any) =>
                taskData.some((task:any) => task.projectsId === projectId && task.members[0].id === user.id)
            );

            setProducts(filteredUsers);
            // setProducts(userData);

            function getEmpTaskStats(id:any){
                let todo=0;
                let overdue1 = 0;
                let ontime = 0;
                var late = 0;
                let total =0;

                var today = new Date();
                for(let m=0; m<taskData.length; m++){
                    if(id==taskData[m].members[0].id){
                        total=total+1;
                        if(!taskData[m].completed){
                            todo=todo+1;
                        }
                        var dueDate = new Date(taskData[m].dueDate);
                        if(!taskData[m].completed && today>dueDate){
                            overdue1=overdue1+1;
                            late=late+1;                   
                        }
                        else if(taskData[m].completed){
                            var completedDate = new Date(taskData[m].completionDate);
                            if(dueDate>=completedDate){
                                ontime=ontime+1;
                            }
                            else{
                                late=late+1;
                            }            
                        }
                    }
                }
            
            let rating1;
            if(total>0){
                rating1 = Math.round(ontime/total * 10);
            }else {
                rating1 = "NA"
            }
            
            return {current: todo, overdue: overdue1, rating: rating1};
            }
          });



        const select = document.getElementById("chartSelect");
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    }, []);

    return (
            <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '20rem' }} selectionMode="single" selection={selectedProduct}
        onSelectionChange={(e) => empSelect(e.value)} dataKey="id">
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable />
                ))}
            </DataTable>
        </div>
    )
}