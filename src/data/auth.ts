import { AuthSession } from "@supabase/supabase-js"

export type AuthenticationContext = {
    session: AuthSession | null
    isLoading: boolean,
    error: any | null,
    login: (creds: Credentials) => Promise<void>,
    register: (creds: Credentials) => Promise<void>,
    logout: ()=> Promise<void>,
}

export type Credentials = {
  email: `${string}@${string}.${'org'|'com'|'net'|'io'|'uk'}`
  password: string
}