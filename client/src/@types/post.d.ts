interface Post {
    title: string;
    content: string;
    vote?: [];
    status?: string;
}

interface GetCondititon {
    page: number;
    limit: number;
}
