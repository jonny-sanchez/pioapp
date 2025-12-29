import { ObjectAuthType } from "types/Request/AuthorizationTypes";

export const AuthorizationHeaders:ObjectAuthType = {
    bearer: (credentials) => `Bearer ${credentials.api_token}`,
    // basic: (credentials) => `Basic ${Buffer.from(`${credentials.basic_username}:${credentials.basic_password}`).toString('base64')}`,
    // Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    basic: (credentials) => `Basic ${btoa(`${credentials.basic_username}:${credentials.basic_password}`)}`, 
}