



export const config = {
  appId: '65875f4c-eb67-4127-a870-ba4e468d366f',
  redirectUri: 'https://www.experthubllc.com/',
  // scopes: ['openid', 'profile', 'user.read', 'email'],
  scopes: ['https://graph.microsoft.com/.default'],
  authority: 'https://login.microsoftonline.com/common',
};  

const msalConfig = {
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
    // storeAuthStateInCookie: isIE(),
  },
};


export default msalConfig;
