export interface Price {
    id: string;
    unit_price_excl: number;
    unit_price_incl: number;
    start_date: string;
    end_date: string | null;
    status: boolean | null;
}
