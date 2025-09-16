export default async function makeRequest(url: string, method: string = 'GET', body: any = null, isFile: boolean = false) {
    const SERVER_URL = "http://localhost:3004"
    try {
        let res
        if (isFile) {

            await new Promise(resolve => setTimeout(resolve, 500))
            
            res = await fetch(`${SERVER_URL}${url}`, {
                method,
                body,
                credentials: 'include'
            })
        } else {
            const options: RequestInit = {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            };

            if (body) options.body = JSON.stringify(body);

            await new Promise(resolve => setTimeout(resolve, 500))

            res = await fetch(`${SERVER_URL}${url}`, options);
        }

        if (res.status === 401) {
            return ('Token expired of invalid. Please login again.');
        }
        if (!res.ok) {
            const errText = await res.text();
            return (errText);
        }

        const contentType = res.headers.get('Content-Type');
        return contentType && contentType.includes('application/json')
            ? await res.json() : await res.text();

    } catch (err: any) {
        return (err.message);
    }
}
