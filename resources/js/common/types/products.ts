export type ProductAttribute = {name: string, value?: string | null}

export type ProductServerItem = {
    id: number
    name: string
    price: number
    description?: string | null
    is_active?: boolean
    attributes?: ProductAttribute[]
    image?: {
        url: string
        full_url: string
    } | null
    order_column: number
    created_at: string
    updated_at: string
}

export type ProductServerCollectionItem = {
    id: number
    name: string
    is_active?: boolean
    order_column: number
    created_at: string
    updated_at: string
}

