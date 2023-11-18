
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as _ from 'plugins/createMeeting';
import { UserAtom } from 'atoms/UserAtom';
import { useRecoilValue } from 'recoil';

const Oauth_redirect = () => {
    const author = useRecoilValue(UserAtom);
    const [message, setMessage] = useState("Running ..");
    const [active, setActive] = useState<any>(author);
    const [noOfAtempts, incrementNoOfAtempts] = useState(0);

    useEffect(() => {
        setActive(author);
    }, [author !== null]);

    const StoreZoomToken = async (token: any, id: any) => {
        setMessage("");
        if (!author) {
            if (noOfAtempts > 4) {
                setTimeout(() => {
                    incrementNoOfAtempts(noOfAtempts+1);
                    StoreZoomToken(token, author.id);
                }, 2000);
            } else {
                setMessage("Error getting userId, make sure you're loggedIn")
            }
        } else {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                const data = {
                    token: token,
                    id: id
                };
                const response = await axios.post(`http://localhost:4000/api/StoreZoomToken${_._ext}`, data, { headers });
                if (response.data === "Access token stored successfully") {
                    //close popup
                } else {
                    // return error message
                    setMessage(response.data)
                }
            } catch (error) {
                // return error message
                setMessage(error)
                console.error(error);
            }
        }
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const access_token = urlSearchParams.get('access_token');
        const expires_in = urlSearchParams.get('expires_in');
        if (access_token) {
            const token = { access_token, expires_in };
            StoreZoomToken(token, author.id);
        }
    }, []);


    return (
        <div>
            <h1>{message}</h1>
            <h1>user: {JSON.stringify(author.id)}</h1>
        </div>
    )
}

export default Oauth_redirect;