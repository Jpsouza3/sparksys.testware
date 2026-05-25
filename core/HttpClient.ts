import { RequestOptions } from "./RequestOptions";

export interface HttpClient {
    get<T>(
        url: string,
        body?: RequestOptions,
        options?: RequestOptions
    ) : Promise<T>;

    post<T>(
        url: string,
        body?: RequestOptions,
        options?: RequestOptions
    ) : Promise<T>;
}