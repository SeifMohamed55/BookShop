// api-client-base.ts
export class ApiClientBase {
    protected getCookieValue(name: string): string {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || '';
        }
        return '';
    }

    protected transformOptions(options: RequestInit): Promise<RequestInit> {
        if (options.method !== 'GET') {
            const token = this.getCookieValue('XSRF-TOKEN');
            if (token) {
                options.headers = {
                    ...options.headers,
                    'X-XSRF-TOKEN': token
                };
            }
        }
        return Promise.resolve(options);
    }
}