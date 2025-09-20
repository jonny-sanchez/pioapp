export type ResponseService<T = any> = {
    message?: string | null | undefined;
    status?: boolean | null | undefined;
    errors?: any;
    data?: T;
}

export const generateJsonError = (error:any = '', tipo: 'object' | 'array' = 'object'):ResponseService<any> => {
    return { 
        message: `${error}`, 
        status: false, 
        data: tipo === 'array' ? [] : null
    }
}