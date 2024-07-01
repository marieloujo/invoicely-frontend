import { Price } from './price.model';
export interface Product {
    id: string | null;
    slug: string | null;
    designation: string;
    lower_limit: number | null | undefined;
    stock: number | null | undefined;
    price: Price | null
}
