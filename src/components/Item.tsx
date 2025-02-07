import { EmployeeModel } from "../models/EmployeeModel";

export default function Item(props: {employee: EmployeeModel, handlerSetCurrentItemId: Function}) {

   const {employee, handlerSetCurrentItemId} = props;

   function handlerSelectItem() {
      handlerSetCurrentItemId(employee.id);
   }

   return (
      <div className="flex justify-between not-last:border-b-1 not-last:pb-1 not-last:border-gray-200 cursor-pointer" onClick={handlerSelectItem}>
            <div className="w-full text-center">
               <span>{employee.lastName + " " + employee.firstName + " " + employee?.middleName}</span>
            </div>
            <div className="w-full text-center">
               <span>{employee.department}</span>
            </div>
            <div className="w-full text-center">
               <span>{employee?.post}</span>
            </div>
      </div>
   )
}