export interface Issue {
    id: number
    title: string
    comments: number
    url: string
    createdAt: string
    user: {
        login: string,
        iconUrl: string
        htmlUrl: string
    }
}
