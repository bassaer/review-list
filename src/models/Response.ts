export interface Response {
    items: Array<{
        number: number
        title: string
        created_at: string
        html_url: string
        comments: number
        closed_at?: string
        user: {
            login: string
            avatar_url: string
            html_url: string
        }
    }>
}
