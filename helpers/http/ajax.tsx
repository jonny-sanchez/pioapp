import { logout } from "helpers/authHelper/authHelper";
import { NavigationService } from "helpers/navigator/navigationScreens";
import { validateConnectionInternetActive } from "helpers/network/internetHelper";
import { getValueStorage } from "helpers/store/storeApp";

// export const URLPIOAPP = `http://192.168.0.46:5000/api`
export const URLPIOAPP = `http://10.0.2.2:5000/api`
// export const URLPIOAPP = `https://services.sistemaspinulito.com/pioapi`

export const timeout = function(s:number)
{
    return new Promise(function(_, reject) {
        setTimeout(() => {
            reject(new Error(`Lo sentimos la consulta tardo ${s} segundos!, intente de nuevo.`));
        }, s * 1000);
    });
};

export async function AJAX(
    url: string = '',
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' = 'GET',
    uploadData:any = null,
    formData = false,
    blob:boolean = false,
    headers:any = null
) {

    try {
        //validar intenert antes de comenzar el fetch
        const resultInternetActive = await validateConnectionInternetActive()

        if(!resultInternetActive) NavigationService.navigate('InternetFail')

        const user = getValueStorage('user')
        // const user = { token: '' }

        const api_token = (user?.token ?? null) || ''

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

        const response:Response = await Promise.race([fetchResponse, timeout(30)]) as Response
        const data:object | any = blob ? await response.blob() : await response.json()

        if(response.status == 401) logout()

        if(!response.ok) throw new Error(data?.message || 'Internal Server error response.')

        return data
        
    } catch (error:any) { 

        throw error
    }

}

export const FormDataGenerate = (data:object) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value])=> formData.append(
            `${key}`, 
            value
        )
    )
    return formData
}