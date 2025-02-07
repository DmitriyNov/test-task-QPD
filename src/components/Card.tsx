import moment from "moment";
import { EmployeeModel } from "../models/EmployeeModel";

export default function Card(props: {employee: EmployeeModel}) {

    const {employee} = props;

    const birthDate: string | undefined = moment(employee?.birthDate).locale("ru").calendar(); 

    return (
        <div className="flex gap-10">
            <div className="w-80 h-80">
                {(employee?.photo) ? 
                <img className="w-80 h-80 object-cover rounded-xl" src={"data:image/jpeg;base64," + employee.photo} /> :
                <img className="w-80 h-80 object-cover rounded-xl" src={"/default_photo.png"} />
                }
                
            </div>
            <div className="text-lg flex flex-col gap-2">
                <div className="flex gap-1">
                    <span>
                        Фамилия:
                    </span>
                    <span className="font-medium">
                        {employee?.lastName}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>
                        Имя:
                    </span>
                    <span className="font-medium">
                        {employee?.firstName}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>
                        Отчество:
                    </span>
                    <span className="font-medium">
                        {employee?.middleName}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>
                        Дата рождения:
                    </span>
                    <span className="font-medium">
                        {birthDate}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>
                        Департамент:
                    </span>
                    <span className="font-medium">
                        {employee?.department}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>
                        Должность:
                    </span>
                    <span className="font-medium">
                        {employee?.post}
                    </span>
                </div>
            </div>
        </div>
    )
}