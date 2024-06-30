import { BearerToken } from "../../../shared/models/bearer-token.model";
import { User } from "../../../shared/models/user.model";

export interface LoginData {
    access_token: BearerToken,
    user: User
}

export interface LoginResponse {
    status: boolean,
    status_code: string,
    message: string,
    data: LoginData
}
