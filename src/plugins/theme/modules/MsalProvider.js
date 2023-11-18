
import { MsalProvider as MsalReactProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import msalConfig from './msalConfig';


const msalInstance = new PublicClientApplication(msalConfig);

const MsalProvider = ({ children }) => {

  return (
    <MsalReactProvider instance={msalInstance}>
      {children}
    </MsalReactProvider>
  );
};

export default MsalProvider;
