import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '38ba5f3a-8776-412e-8aaa-4d16473bcb7e',
        authority: 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/',
        redirectUri: 'https://istest.franklintn.gov/traffic-calming',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["openid", "profile"],
    redirectUri: "https://istest.franklintn.gov/traffic-calming"
};