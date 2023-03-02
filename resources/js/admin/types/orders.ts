import {ProductServerCollectionItem} from "../../common/types/products";
import {SubscriberServerCollectionItem} from "./subscribers";
import {BotServerCollectionItem} from "./bots";

export type OrderServerCollectionItem = {
    id: number
    total: number
    product?: ProductServerCollectionItem | null
    subscriber?: SubscriberServerCollectionItem | null
    status: string
    created_at: string
    updated_at: string
}

export type OrderServerItem = {
    id: number
    total: number
    product?: ProductServerCollectionItem | null
    subscriber?: SubscriberServerCollectionItem | null
    bot?: BotServerCollectionItem | null
    details?: OrderDetail[] | null
    status: string
    notes?: string | null
    created_at: string
    updated_at: string
}

export type OrderDetail = {
    name: string
    value: string | boolean | number
}

