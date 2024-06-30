import { TypeFacturation } from "./type-facturation";

export interface User {
    id: string,
    name: string,
    email: string,
    type: TypeFacturation,
}