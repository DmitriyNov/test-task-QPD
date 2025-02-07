import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { EmployeeModel, OutletContext } from "../models/EmployeeModel";
import Search from "./Search";
import List from "./List";
import Pagination from "./Pagination";

export default function EmployeesList() {

    const {handlerSetCurrentItemId} = useOutletContext<OutletContext>();

    // Список сотрудников, получаемый от "сервера"
    const [employeesList, setEmployeesList] = useState<EmployeeModel[]>([]);
    function handlerSetEmployeesList(data: EmployeeModel[]) {
        setEmployeesList(data);
    }

    // Список сотрудников, отрисовываемый на текущей странице
    const [currentEemployeesList, setCurrentEmployeesList] = useState<EmployeeModel[]>([]);
    function handlerSetCurrentEmployeesList(data: EmployeeModel[]) {
        setCurrentEmployeesList(data);
    }

    // Загрузка всего списка сотрудников при отрисовке компонента списка
    useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((data) => {
            setEmployeesList(data);
        });
    }, []);

    return (
        <div className="w-240 mx-auto flex flex-col gap-5">
            <Search employeesList={employeesList} setEmployeesList={handlerSetEmployeesList}/>
            <List employeesList={currentEemployeesList} handlerSetCurrentItemId={handlerSetCurrentItemId}/>
            <Pagination employeesList={employeesList} setCurrentEmployeesList={handlerSetCurrentEmployeesList}/>
        </div>
    )
}