export interface EmployeeModel {
    id: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    birthDate: string,
    department: string,
    post: string,
    salary: number,
    photo?: string,
}

export interface OutletContext {
    currentItemId: number | null,
    handlerSetCurrentItemId: Function,
}