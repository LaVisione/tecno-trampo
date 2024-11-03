export class BankEndpoint {

    private id!: number;
    private url!: string;
    private headers: Record<string, string>;
    private body: Record<string, any>;

    constructor(id: number, url: string, headers: Record<string, string> = {}, body: Record<string, any> = {}) {
        this.id = id;
        this.url = url;
        this.headers = headers;
        this.body = body;
    }

    public getid(): number {
        return this.id;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getHeaders(): Record<string, string> {
        return this.headers;
    }

    public setHeaders(headers: Record<string, string>): void {
        this.headers = headers;
    }

    public getBody(): Record<string, any> {
        return this.body;
    }

    public setBody(body: Record<string, any>): void {
        this.body = body;
    }

}