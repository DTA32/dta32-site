export interface ResponseTemplate<T>{
    status: string;
    data: T;
    message: string | null;
}