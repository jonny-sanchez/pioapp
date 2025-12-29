export type AuthHedearsType = 'bearer'|'basic'

export type CredentialParamsType = {
  api_token:string;
  basic_username:string;
  basic_password:string;
}

export type ObjectAuthType = {
  [K in AuthHedearsType]: (credentials:CredentialParamsType) => string;
}