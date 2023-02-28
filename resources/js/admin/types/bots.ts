export type BotServerCollectionItem = {
    id: number
    name: string
    type: string
    created_at: string
    updated_at: string
}

export type BotServerItem = {
    id: number
    name: string
    type: string
    token: string
    webhook: boolean
    settings: {[key: string]: any}
    image_url?: string | null
    created_at: string
    updated_at: string
}

export type DeliveryBotSettings = {
    workers_max_count?: number | null
    workers_price?: number | null
    workers_min_hours?: number | null
    workers_max_hours?: number | null
    rent_min?: number | null
    rent_max?: number | null
}
