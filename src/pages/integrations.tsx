import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from "layout/FrontLayout"
import axios from "axios";
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';

import { SERVER_URL_ztAPI, _ext } from 'plugins/theme/modules/includes';
import { config } from 'plugins/theme/modules/msalConfig';

const connects = [
    {
        icon: "/images/icon_teams.png",
        title: "Microsoft Teams",
        subtitle: "Use your microsoft teams account to create meetings.",
        status: "available",
    },
    {
        icon: "/images/icon_zoom.png",
        title: "Zoom",
        subtitle: "Use your zoom account to create meetings.",
        status: "available",
    },
    {
        icon: "/images/icon_facebook.png",
        title: "Facebook",
        subtitle: "Facebook's massive active user base makes for a great place to share your posts and connect with your followers..",
        status: "coming soon",
    },
    {
        icon: "/images/icon_linkedin.png",
        title: "Linkedin",
        subtitle: "Sharing posts to your Linkedin Connections.",
        status: "coming soon",
    },
    {
        icon: "/images/icon_twitter.png",
        title: "Twitter",
        subtitle: "Sharing posts to your twitter page.",
        status: "coming soon",
    },
    {
        icon: "/images/icon_google.png",
        title: "Google",
        subtitle: "Sharing posts to your Google account.",
        status: "coming soon",
    },
    {
        icon: "/images/icon_instagram.png",
        title: "Instagram Business",
        subtitle: "Drive engagement and save time by automatically sharing images to Instagram when you make a post..",
        status: "coming soon",
    },
]
const styles = {
    defaultButtonCont: { width: "10%", display: "flex", justifyContent: "center", alignItems: "center" },
    defaultButtonCont2: { width: "25%", display: "flex", justifyContent: "center", alignItems: "center" },
    connectBlured: { borderColor: "#F7A607", borderWidth: 2, borderRadius: 32, width: 210, height: 46, display: "flex", justifyContent: "center", alignItems: "center", transition: "0.2s", cursor: "pointer" },
    connectFocused: { borderColor: "#F7A607", borderWidth: 2, borderRadius: 32, width: 210, height: 46, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F7A607", transition: "0.2s", cursor: "pointer" },
    connectDisabled: { borderColor: "rgba(0,0,0,0)", borderWidth: 0, borderRadius: 32, width: 210, height: 46, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", transition: "0.2s", cursor: "pointer" },
    textBlured: { fontWeight: "bolder", color: "#F7A607", transition: "0.2s" },
    textFocused: { fontWeight: "bolder", color: "white", transition: "0.2s" },
}


const Integration_Button = (params: any,) => {
    const popUpWindowRef = useRef(null);
    const router = useRouter();
    const userId = ""
    const [connected, isConnected] = useState(false);
    const [connectButtonFocused, isConnectButtonFocused] = useState(false);
    const [ID, setID] = useState(false);
    const { instance, accounts, inProgress } = useMsal();
    const [teams_access_token, set_teams_access_token] = useState(null);
    const [retryItration, setRetryItration] = useState(0);

    const doNothing = () => {
        return { response: "success", body: {} };
    };
    const connectToService = async () => {
        if (params.title === "Microsoft Teams") {
            await RequestAuth_teams(instance);
        } else if (params.title === "Zoom") {
            await RequestAuth_zoom(popUpWindowRef, router);
        } else {
            doNothing();
        }
    };


    useEffect(() => {
        const checkStatus = async () => {
            if (params.title === "Microsoft Teams") {
                return await isUserSignedIn_teamApi(accounts, inProgress);
            } else if (params.title === "Zoom") {
                return await isUserSignedIn_zoomApi(userId, "startUp");
            } else {
                return doNothing();
            }
        };

        const fetchData = async () => {
            const response = await checkStatus();
            if (response.response === "success") {
                if (response.body.id) {
                    isConnected(true);
                    setID(response.body.id);
                }
            } else if (response.response === "retry") {
                if (retryItration <= 3) {
                    // setRetryItration(retryItration + 1);
                    // fetchData();
                }
            }
        }

        fetchData();
    }, []);


    return (
        <div style={{ width: "100%", padding: 20, display: "flex", justifyContent: "center" }}>
            <div style={styles.defaultButtonCont}>
                <img src={params.icon} style={{ width: 80, height: 80, objectFit: "contain" }} alt="" />
            </div>
            <div style={{ width: "60%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <h6>{params.title}</h6>
                <p style={{ fontSize: "small" }}>{params.subtitle}</p>
            </div>
            <div style={styles.defaultButtonCont2}>
                <div
                    onClick={() => { connectToService() }}
                    style={params.status === "coming soon" ? styles.connectDisabled : connectButtonFocused === true ? styles.connectFocused : styles.connectBlured}
                    onMouseOver={() => { isConnectButtonFocused(true) }}
                    onMouseLeave={() => { isConnectButtonFocused(false) }}
                >
                    <p style={
                        params.status === "coming soon" ? styles.textFocused :
                            connectButtonFocused === true ? styles.textFocused :
                                styles.textBlured}>
                        {params.status === "coming soon" ? "coming soon" : connected === true ? "disConnect" : "Connect"}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Integration_Map = (userId: any) => {
    return (
        <>
            {
                connects.map((value) => {
                    return (
                        <Integration_Button icon={value.icon} subtitle={value.subtitle} title={value.title} status={value.status} />
                    )
                })
            }
        </>
    );
};

const Integration = () => {
    const author = useRecoilValue(UserAtom);
    const { instance } = useMsal();
    // const router = useRouter();
    const [active, setActive] = useState<any>(author)


    const handleRedirect = async () => {
        try {
            await instance.handleRedirectPromise();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setActive(author)
    }, [author !== null])
    useEffect(() => {
        handleRedirect();
    }, []);


    return (
        <FrontLayout msg={false}>
            <div className="lg:mx-32">
                <div className="p-2 pl-8 text-lg">Integrating Services</div>
                <div className="p-1 pl-8 border-b border-gray-200 text-xlg">Connect your account to social networks and other services.</div>
                <Integration_Map userId={author?.id} />
            </div>
        </FrontLayout>
    )
}


// Return Functions
const isUserSignedIn_zoomApi = async (id: any, init: any) => {
    if (!id) {
        return { response: "retry", body: {} };
    } else {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                id: id,
            };
            const response = await axios.post(`${SERVER_URL_ztAPI}/isUserSignedIn_zoomApi${_ext}`, data, { headers });
            if (response.data.email) {
                const email = response.data.email;
                return { response: "success", body: { id: email } };
            } else {
                return { response: "failed", body: response.data };
            }
        } catch (error) {
            return { response: "error", body: { error } };
        }
    }
}
const isUserSignedIn_teamApi = async (accounts: any, inProgress: any) => {
    if (accounts.length > 0 && inProgress === "none") {
        const email = accounts[0].name;
        return { response: "success", body: { id: email } };
    } else {
        return { response: "failed", body: {} };
    }
}
const RequestAuth_zoom = async (popUpWindowRef: any, router: any) => {

    try {
        const response = await axios.get(`${SERVER_URL_ztAPI}/authorize_zoom${_ext}`);
        const authUrl = response.data;

        popUpWindowRef.current = window.open(authUrl, 'Zoom Auth', 'width=600,height=600');

        const intervalId = setInterval(() => {
            if (popUpWindowRef.current) {
                if (popUpWindowRef.current.closed) {
                    // Pop-up window is closed
                    clearInterval(intervalId);
                    router.reload();
                }
            } else {
                // Pop-up window was blocked or not opened
                clearInterval(intervalId);
                alert('Error: Pop-up window was blocked or not opened.');
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    } catch (error) {
        console.error('Error: Unable to obtain Zoom authorization URL.', error);
    }
};
const RequestAuth_teams = async (instance: any) => {
    try {
        await instance.loginRedirect({
            scopes: config.scopes,
            prompt: 'select_account'
        });
    } catch (error) {
        console.error(error);
    }
};


export default Integration;
