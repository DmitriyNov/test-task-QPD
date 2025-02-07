import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { EmployeeModel, OutletContext } from "../models/EmployeeModel";
import Card from "./Card";

export default function EmployeesCard() {

    const {currentItemId, handlerSetCurrentItemId} = useOutletContext<OutletContext>();

    const [employee, setEmployee] = useState<EmployeeModel>();

    // Загрузка данных сотрудника при изменении текущего id
    useEffect(() => {
        if (currentItemId !== null) {
            fetch("/api/card/" + currentItemId)
            .then((response) => response.json())
            .then((data) => {
                setEmployee(data);
            })
        }
    }, [currentItemId]);

    // Обработчик для кнопки назад
    function backToList() {
        handlerSetCurrentItemId(null);
    }

    return (
        <div className="w-240 p-6 mx-auto flex flex-col gap-6 bg-white rounded-xl">
            <div className="">
                <button className="font-medium w-30 p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-xl" onClick={backToList}>
                    Назад
                </button>
            </div>
            {(employee === undefined) || <Card employee={employee} />}
        </div>
    )
}