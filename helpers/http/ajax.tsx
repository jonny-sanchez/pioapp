export const URLPIOAPP = `http://localhost:5000/api`

export const timeout = function(s:number)
{
    return new Promise(function(_, reject) {
        setTimeout(() => {
            reject(new Error(`Lo sentimos la consulta tardo ${s} segundos!, vuelve a recargar`));
        }, s * 1000);
    });
};

export async function AJAX(
    url: string = '',
    method: string = 'GET',
    uploadData:any = null,
    formData = false,
    blob:boolean = false,
    headers:any = null
) {

    try {
        const api_token = ''

        const fetchResponse = fetch(`${ url }`, {
            method,
            headers: {
                'Accept': 'application/json',
                ...(blob === false && !formData && {
                    'Content-Type': 'application/json; charset=utf-8'
                }),
                // 'Cookie': 'PHPSESSID=jnps6kvd7kp5lf0h7j0b6anivg',
                // 'X-CSRF-TOKEN': `${csrf_token}`,
                'Authorization': `Bearer ${api_token}`,
                ...headers
            },
            ...(uploadData ? { body: formData ? uploadData : JSON.stringify(uploadData) } : {})
        })

        const response:Response = await Promise.race([fetchResponse, timeout(60)]) as Response
        const data:object | any = blob ? await response.blob() : await response.json()

        // if(response.status === 401) 

        if(!response.ok) throw new Error(data?.message || 'Internal Server error response.')

        return data
        
    } catch (error:any) { throw error }

}