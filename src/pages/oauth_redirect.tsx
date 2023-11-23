
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as _ from 'plugins/createMeeting';
import { UserAtom } from 'atoms/UserAtom';
import { useRecoilValue } from 'recoil';
import { SERVER_URL_ztAPI } from 'plugins/theme/modules/includes';

const Oauth_redirect = () => {
    const author = useRecoilValue(UserAtom);
    const [message, setMessage] = useState("Running ..");
    const [active, setActive] = useState<any>(author);
    const [noOfAtempts, incrementNoOfAtempts] = useState(0);
    const [access_token, setAccess_token] = useState(null);

    useEffect(() => {
        setActive(author);
    }, [author !== null]);

    const StoreZoomToken = async (token: any, id: any) => {
        if (!id) {
            setMessage("We couldn't get your information.");
            if (noOfAtempts <= 4) {
                setTimeout(() => {
                    setMessage("Retrying ...");
                    const increment = noOfAtempts + 1
                    incrementNoOfAtempts(increment);
                    StoreZoomToken(token, author?.id);
                }, 2000);
            } else {
                setMessage("Error getting userId, make sure you're loggedIn");
                setTimeout(() => {
                    window.close();
                }, 5000);
            }
        } else {
            setMessage("Signing In to zoom as you!");
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                const data = {
                    token: token,
                    id: id
                };
                const response = await axios.post(`${SERVER_URL_ztAPI}/StoreZoomToken${_._ext}`, data, { headers });
                if (response.data === "Access token stored successfully") {
                    //close popup
                    setMessage(JSON.stringify(response.data));
                    setTimeout(() => {
                        window.close();
                    }, 2000);
                } else {
                    // return error message
                    setMessage(JSON.stringify(response.data));
                    setTimeout(() => {
                        window.close();
                    }, 2000);
                }
            } catch (error) {
                // return error message
                setMessage(JSON.stringify(error))
                console.error(error);
                setTimeout(() => {
                    window.close();
                }, 5000);
            }
        }
    }


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const access_token = urlSearchParams.get('access_token');
        const expires_in = urlSearchParams.get('expires_in');
        if (access_token) {
            const token = { access_token, expires_in };
            setAccess_token(token);
            setTimeout(() => {
                StoreZoomToken(token, author?.id);
            }, 3000);
        } else {
            setMessage("no redirect code provided");
            setTimeout(() => {
                window.close();
            }, 5000);
        }
    }, []);


    return (
        <div>
            <h1>{message}</h1>
            <h1>user: {JSON.stringify(author?.id)}</h1>
            {access_token && <button style={{color: "blue"}} onClick={() => {StoreZoomToken(access_token, author?.id);}}>Signin to zoom</button>}
        </div>
    )
}

export default Oauth_redirect;