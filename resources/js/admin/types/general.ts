export type HasChildren = {
    children?: React.ReactNode
};

export type HasClassName = {
    className?: string
};

export type User = {
    id: number
    name: string
    email: string
    email_verified_at?: string
    is_super?: boolean
    created_at?: string
    updated_at?: string
}

export type PageProps = {
    auth?: {
        user?: User
    }
}

export type LinkData = {
    active: boolean
    label: string
    url: string
}

export type ServerCollectionResponse<T extends any> = {
    data: T[]
    meta: {
        links: LinkData[]
        total: number
        per_page: number
    }
}

export type IconProps = {

} & HasClassName

export type SortData = {orderBy: string, order: 'desc' | 'asc'};
