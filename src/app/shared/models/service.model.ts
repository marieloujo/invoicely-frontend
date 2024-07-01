import { Price } from './price.model';
export interface Service {
    id: string | null;
    slug: string | null;
    stock: number | null;
    designation: string;
    price: Price | null
}
