import {BotServerCollectionItem} from "./bots";

export type SubscriberServerCollectionItem = {
    id: number
    tid: string
    username: string
    first_name?: string
    created_at: string
    updated_at: string
}

export type SubscriberServerItem = {
    id: number
    tid: string
    username: string
    first_name: string
    last_name: string
    language_code: string
    is_premium: boolean
    added_to_attachment_menu: boolean
    is_blocked: boolean
    is_bot: boolean
    bots?: BotServerCollectionItem[]
    created_at: string
    updated_at: string
}

