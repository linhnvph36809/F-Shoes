export interface IPost {
    id?: string | number;
    title: string;
    slug?: string;
    content: string;
    create_at?: string;
    view: string | number;
    author_id: string | number;
    deleted_at: string;
}
