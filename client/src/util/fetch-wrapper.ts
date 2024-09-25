type DefaultBody = Record<string, unknown>;
type MethodType = "POST" | "PUT" | "DELETE";

export default class FetchWrapper {
    #baseURL;

    constructor(baseURL: string) {
        this.#baseURL = baseURL;
    }

    get(endpoint: string) {
        return fetch(this.#baseURL + endpoint, {
            credentials: 'include'
        })
    }
    
    post<B = DefaultBody>(endpoint: string, body: B) {
        return this.#send<B>("POST", endpoint, body)
    }

    put<B = DefaultBody>(endpoint: string, body: B) {
        return this.#send<B>("PUT", endpoint, body)
    }

    delete<B = DefaultBody>(endpoint: string, body?: B) {
        return this.#send<B>("DELETE", endpoint, body)
    }

    #send<B>(method: MethodType, endpoint: string, body?: B) {
        return fetch(this.#baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
    }
}