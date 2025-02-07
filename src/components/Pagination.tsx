import { useEffect, useState, MouseEvent } from "react";
import { EmployeeModel } from "../models/EmployeeModel";

export default function Pagination(props: {employeesList: EmployeeModel[], setCurrentEmployeesList: Function}) {

    const {employeesList, setCurrentEmployeesList} = props;

    // Текущий номер страницы
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Массив из массивов списка, разбитый по страницам (10 элементов на странице)
    const convertedEmployeesList: EmployeeModel[][] = [];
    const pagesQuantity: number = Math.ceil(employeesList.length / 10);
    for (let i: number = 0; i < pagesQuantity; i++) {
        convertedEmployeesList.push(employeesList.slice(i * 10, i * 10 + 10));
    }

    // При первой отрисовке компонента и изменении списка пользователей отрисовываем текущей первую страницу
    useEffect(() => {
        setCurrentPage(0);
        setCurrentEmployeesList(convertedEmployeesList[currentPage] || []);
    }, [employeesList]);

    // Обработчик для нажатия на стрелки
    function handlerArrowButton(event: MouseEvent<HTMLButtonElement>) {
        if (event.currentTarget.id === "forward" && currentPage < pagesQuantity - 1) {
            setCurrentPage(currentPage + 1);
        } else if (event.currentTarget.id === "back" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    // Обработчик для нажатия на номера страниц
    function handlerNumberButton(event: MouseEvent<HTMLButtonElement>) {
        setCurrentPage(parseInt(event.currentTarget.id));
    }

    // При изменении номера страницы отрисовываем соответствующий список
    useEffect(() => {
        setCurrentEmployeesList(convertedEmployeesList[currentPage] || []);
    }, [currentPage]);

    // Если список пуст, компонент не отрисовывается
    if (employeesList.length === 0) {
        return(<></>)
    }

    return (
        <div className="mx-auto flex items-center gap-3">
            <button className="w-10 h-10 p-2 cursor-pointer" id="back" onClick={handlerArrowButton}>
                <span className="material-symbols-outlined">
                    chevron_left
                </span>
            </button>
            {convertedEmployeesList.map((_item: EmployeeModel[], i: number) => (
                <button key={i} className={"w-10 h-10 p-2 bg-white rounded-lg cursor-pointer " + ((i === currentPage) && "!bg-gray-300")} id={i.toString()} onClick={handlerNumberButton}>
                    <span>
                        {i + 1}
                    </span>
                </button>
            ))}
            <button className="w-10 h-10 p-2 cursor-pointer" id="forward" onClick={handlerArrowButton}>
                <span className="material-symbols-outlined">
                    chevron_right
                </span>
            </button>
        </div>
    )
}