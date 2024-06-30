export interface ApiResponse<T> {
    status: boolean;
    message: string | null;
    status_code: number;
    data: T;
}

export interface ApiListResponse<T> {
    status: boolean;
    message: string | null;
    status_code: number;
    data: PaginationData<T>;
}

export interface PaginationData<T> {
    current_page: number;
    last_page: number,
    total: number;
    data: T[];
}
