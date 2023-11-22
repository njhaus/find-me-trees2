
const baseUrl = "http://localhost:3008/";



export const apiPost = async (url: string, body: unknown) => {
    try {
        console.log("Api client running");
        const response = await fetch(`${baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        // if (!response.ok) throw new Error("error retrieving data!");
        const responseJson = await response.json();
        return responseJson;
    } catch (err: any) {
        return 'error';
    }
};