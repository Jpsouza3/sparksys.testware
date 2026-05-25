import {
  APIRequestContext,
  APIResponse
} from "@playwright/test";

import { HttpClient } from "./HttpClient";
import { RequestOptions } from "./RequestOptions";

export class PlaywrightHttpClient implements HttpClient {
  constructor(private request: APIRequestContext) {}

async get<T>(
  url: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {

  const response = await this.request.get(url, {
    data: body,
    headers: options?.headers,
    params: options?.params,
  });

  return this.handleResponse<T>(response);
}

  async post<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.post(url, {
      data: body,
      headers: options?.headers,
      params: options?.params,
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(
    response: APIResponse
  ): Promise<T> {
    if (!response.ok()) {
      throw new Error(
        `HTTP Error: ${response.status()} - ${response.statusText()}`
      );
    }

    return response.json();
  }
}