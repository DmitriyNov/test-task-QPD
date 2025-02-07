import { useState, ChangeEvent } from "react";
import { EmployeeModel } from "../models/EmployeeModel";

export default function Search(props: {employeesList: EmployeeModel[], setEmployeesList: Function}) {

    const {employeesList, setEmployeesList} = props;

    // Значение в поле поиска и обработчик для набора этого значения
    const [searchText, setSearchText] = useState<string>("");
    function handlerChangeText(event: ChangeEvent<HTMLInputElement>) {
        // Ограничение количества символов
        if (event.currentTarget.value.length > 20) {
            return;
        }
        // Так как поиск работает только по одному слову, ограничу написание всех символов, кроме букв
        const lastSymbol = event.currentTarget.value.toString().slice(-1);
        const filter = /^[a-я]/i;
        if (!filter.test(lastSymbol) && lastSymbol !== "") {
            return;
        }
        setSearchText(event.currentTarget.value);
    }

    // ОБработчик для клика кнопки поиск
    function startSearch() {
        if (searchText) {
            fetch("/api/search/" + searchText)
            .then(response => response.json())
            .then((data) => {
                setEmployeesList(data);
                setSearchText("");
            }); 
        } else {
            // При пустом запросе считаю целесообразным вернуть весь список
            fetch("/api/list")
            .then((response) => response.json())
            .then((data) => {
                setEmployeesList(data);
            });
        }
    }

    return (
        <>
            <div className="text-lg w-full py-4 px-6 relative bg-white rounded-xl">
                <input className="w-full outline-none" type="text" placeholder="Фамилия, имя, отчество или должность..." value={searchText} onChange={handlerChangeText} />
                <button className="font-medium w-30 p-3 absolute top-[50%] -right-14 translate-[-50%] bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-xl" onClick={startSearch}>Поиск</button>
            </div>
            <div className="px-6">
                Всего найдено: {employeesList.length}
            </div>
        </>
    )
}