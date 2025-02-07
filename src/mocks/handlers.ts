import { HttpResponse, http } from "msw";
import { EmployeeModel } from "../models/EmployeeModel";
    
// Получавем данные из JSON файла
let employeesList: EmployeeModel[] = [];
fetch("/employees_list.json")
    .then(response => response.json())
    .then((data) => {
        employeesList = data
    });


// Обработчик запроса полного списка сотрудников
const listResolver = () => {
    return HttpResponse.json(employeesList);
};
const listHandler = http.get("/api/list", listResolver);

// Обработчик запроса поиска
const searchResolver = (request) => {
    const {searchText} = request.params;
    const currentEmployeesList: EmployeeModel[] = [];
    employeesList.forEach((employye: EmployeeModel, i: number) => {
        for (const key in employye) {
            if (typeof employye[key] === "string") {
                const validateProperty = employye[key].toLowerCase();
                if (validateProperty.includes(searchText.toLowerCase())) {
                    currentEmployeesList.push(employeesList[i]);
                    return;
                }
            }
        }
    });
    return HttpResponse.json(currentEmployeesList);
};
const searchHandler = http.get("/api/search/:searchText", searchResolver);

// Обработчик запроса карточки сотрудника
const cardResolver = (request) => {
    const {id} = request.params;
    const currentEmployee: EmployeeModel | undefined = employeesList.find((item: EmployeeModel) => item.id === parseInt(id));
    return HttpResponse.json(currentEmployee);
};
const cardHandler = http.get("/api/card/:id", cardResolver);

export const handlers = [listHandler, searchHandler, cardHandler];