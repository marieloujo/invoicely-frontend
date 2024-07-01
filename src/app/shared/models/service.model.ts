import { Price } from './price.model';
export interface Service {
    id: string | null;
    slug: string | null;
    designation: string;
    price: Price | null
}
