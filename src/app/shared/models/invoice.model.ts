import { Client } from "./client.model";

export interface Invoice {
    id: string | null,
    reference: string | null,
    status: boolean | null,
    total_amount_excl: number | null,
    total_amount_incl: number | null,
    client: Client | null,
    items: InvoiceItem[] | null,
    created_at: string | null
}

export interface InvoiceItem {
    quantity: number,
    total_amount_excl: number | null,
    total_amount_incl: number | null,
    priceable: Priceable
}

export interface Priceable {
    id: string,
    designation: string,
    unit_price_excl: number,
    unit_price_incl: number,
}