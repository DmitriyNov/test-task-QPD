import { EmployeeModel } from "../models/EmployeeModel";
import Item from "./Item";

export default function List(props: {employeesList: EmployeeModel[], handlerSetCurrentItemId: Function}) {
    const {employeesList, handlerSetCurrentItemId} = props;

    return (
        <div className="h-125 p-6 flex flex-col gap-3 bg-white rounded-xl">
            <div className="flex justify-between pb-1 border-b-1 border-gray-400">
                <div className="w-full text-center">
                    <span>ФИО</span>
                </div>
                <div className="w-full text-center">
                    <span>Департамент</span>
                </div>
                <div className="w-full text-center">
                    <span>Должность</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {employeesList.map((item: EmployeeModel) => (
                    <Item key={item.id} employee={item} handlerSetCurrentItemId={handlerSetCurrentItemId} />
                ))}
            </div>
        </div>
    )
}