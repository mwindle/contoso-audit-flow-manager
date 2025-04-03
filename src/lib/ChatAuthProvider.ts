
import { InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';

export class ChatAuthProvider {

    private static _instance?: ChatAuthProvider = undefined;
    private _client: PublicClientApplication;
    
    public static async getInstance(): Promise<ChatAuthProvider> {
        if (!ChatAuthProvider._instance) {
            const spHostname = 'https://spetestingcy25h1.sharepoint.com';
            ChatAuthProvider._instance = new ChatAuthProvider(spHostname);
            await ChatAuthProvider._instance.initialize();
        }
        return ChatAuthProvider._instance;
    }

    private constructor(public readonly hostname: string) {
        this._client = new PublicClientApplication({
            auth: {
                clientId: 'f552fc68-877a-4ce6-b08c-3e05b5040b3a',
                authority: `https://login.microsoftonline.com/2aa49d2b-2cc5-47b1-ba48-e72e8e608b70`,
                redirectUri: window.location.origin,
            },
            cache: {
                // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/caching.md
                /*
                Cache Location	| Cleared on |	Shared between windows/tabs |	Redirect flow supported
                -----------------   ----------  -------------------------   ------------------------
                sessionStorage |	window/tab close |	No |	Yes
                localStorage |	browser close | Yes |   Yes
                memoryStorage | page |  refresh/navigation | No |	No
                */
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: true
            },
        });
    }

    protected async initialize(): Promise<void> {
        await this._client.initialize();
        console.log('MSAL initialized');
    }
    
    public get scopes(): string[] {
        return [
            `${this.hostname}/Container.Selected`
        ];
    }
    
    public async login(): Promise<void> {
        await this._client.loginPopup({
            scopes: this.scopes,
            prompt: 'select_account',
        });
    }

    public isSignedIn(): boolean {
        const accounts = this._client.getAllAccounts();
        if (accounts.length > 0) {
            return true;
        }
        return false;
    }

    public async getToken(): Promise<string> {
        try {
            if (!this._client.getActiveAccount()) {
                throw new InteractionRequiredAuthError('no_account', 'No account is signed in');
            }
            const response = await this._client.acquireTokenSilent({
                scopes: this.scopes
            });
            return response.accessToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                const response = await this._client.acquireTokenPopup({
                    scopes: this.scopes
                });
                if (response.accessToken) {
                    this._client.setActiveAccount(response.account);
                    return response.accessToken;
                }
            }
            throw error;
        }
    }
}