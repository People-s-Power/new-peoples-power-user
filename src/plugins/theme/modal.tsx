import React, { CSSProperties, createRef, useEffect, useState } from "react";
import { AnimatedBlock, Block, Img, Span, String } from "./modules/F_ELEMENTS_v0.1";
import { ZTModal_interface } from "./types/types";
import { options, s1, serviceLogo, services, ValuePiece, Value, duration_options } from "./modules/includes";
// import "./styles/CSS.css";

// install these packages or add them to your package.json and run npm install 
// --> react-date-picker react-time-picker react-dropdown react-timezone-select 
// --> msal axios date-fns date-fns-tz
// or install a JointDependacy from https://github.com/JerrySplendour-ReactJSDependencies
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Dropdown from 'react-dropdown';
import TimezoneSelect from 'react-timezone-select'
import { UserAgentApplication } from 'msal';
import 'react-dropdown/style.css';
import axios from "axios";
import { format, parse, addMinutes } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';






const returnStartTime = (inputDate: any, inputTime: any, inputTimeZone: any) => {
    ;

    // Parse the input date and time
    const parsedDate = parse(`${inputDate} ${inputTime}`, 'dd/MM/yyyy hh:mm a', new Date());
    // Get the time zone offset
    const timeZone = inputTimeZone;
    const zonedDate = utcToZonedTime(parsedDate, timeZone);
    // Convert to the desired format
    const formattedDate = format(zonedDate, 'yyyy-MM-dd\'T\'HH:mm:ssXXX');
    return formattedDate;
}
const returnEndTime = (start_time: any, duration: any) => {
    const startDate = new Date(start_time);
    const endDateTime = new Date(startDate.getTime() + duration * 60 * 1000);
    const endDateTimeISO = endDateTime.toISOString();
    return endDateTimeISO;
}
const msalConfig = {
    auth: {
        clientId: 'your_client_id',
        authority: 'http://localhost:4000/api/redirect_teams',
        redirectUri: 'http://localhost:3000'
    },
};




export function ModalTheme(params: ZTModal_interface) {
    //create meetings params
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [timeValue, setTimeValue] = useState('10:00');
    const [Date_, onChangeDate] = useState<Value>(new Date());
    const [duration, setDuration] = useState(duration_options[0]);
    ////////////////
    //create Microsoft Teams meeting params
    const [teams_user, set_teams_user] = useState("");
    const [teams_access_token, set_teams_access_token] = useState("");
    ////////////////
    const [modalVisbility, shouldModalBeVisible] = useState(false);
    const [modalVisbility_, shouldModalBeVisible_] = useState(false);
    const [extraBlocks, showExtraBlocks] = useState(true);
    const [screenIndex, setScreenIndex] = useState(0);
    const [meetingsHost, setMeetingsHost] = useState("zoom");
    const classByScale = extraBlocks ? "focusByScale" : "blurByScale";
    const [zoomIN, setZoomIn] = useState("");
    const [teamsIN, setTeamsIn] = useState("");
    const [signedIn, updateSignedIn] = useState(meetingsHost === "zoom" ? zoomIN : teamsIN);
    const [msalApp, setMsalApp] = useState(new UserAgentApplication(msalConfig));


    //zoom api functions
    const isUserSignedIn_zoomApi = async (id: any, init: any) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                id: id,
            };
            const response = await axios.post('http://localhost:4000/api/isUserSignedIn_zoomApi', data, { headers });
            if (response.data.email) {
                const email = response.data.email;
                setZoomIn(email);
                updateSignedIn(meetingsHost === "zoom" ? email : teamsIN)
            }
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    }
    //teams api functions
    const isUserSignedIn_teamApi = async (user: any) => {
        if (user) {
            set_teams_user(user);
            const email = user.name;
            setZoomIn(email);
            updateSignedIn(meetingsHost === "zoom" ? email : teamsIN)
        }
    }
    //Request User Auth
    const RequestAuth = () => {
        const request_auth = () => meetingsHost === "zoom" ? RequestAuth_zoom() : RequestAuth_teams();
        request_auth();
    }
    const RequestAuth_zoom = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/authorize_zoom');

            const authUrl = response.data;
            window.location.href = authUrl;
        } catch (error) {
            console.error(error);
        }
    };
    const RequestAuth_teams = async () => {
        // try {
        //     const loginResponse = await msalApp.loginPopup();
        //     set_teams_user(loginResponse.account);
        //     const email = loginResponse.account.user.name;
        //     setZoomIn(email);
        //     updateSignedIn(meetingsHost === "zoom" ? email : teamsIN)
        //     setTimeout(() => {
        //         acquireAccessToken_teams();
        //     }, 100);
        // } catch (error) {
        //     console.error('Login error:', error);
        // }
    };
    const acquireAccessToken_teams = async () => {
        // if (teams_user) {
        //     try {
        //         const tokenResponse = await msalApp.acquireTokenSilent({
        //             scopes: ['api://your_api_id/access_as_user'], // Replace with your API's scope
        //         });
        //         set_teams_access_token(tokenResponse.accessToken);
        //     } catch (error) {
        //         console.error('Token acquisition error:', error);
        //     }
        // } else {
        //     RequestAuth_teams();
        // }
    };
    //create meetings functions
    const createMeeting = async () => {
        const create_meeting = () => meetingsHost === "zoom" ? createZoomMeeting() : createTeamsMeeting();
        create_meeting();
    }
    const createZoomMeeting = async () => {
        const datestring = Date_ ? Date_.toLocaleString().slice(0, 10) : new Date().toLocaleString().slice(0, 10);
        const start_time = returnStartTime(datestring, timeValue, selectedTimezone);
        const id = "A123";

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = { id, start_time, duration: duration.value };
            const response = await axios.post('http://localhost:4000/api/createZoomMeeting', data, { headers });
            if (response.data) {
                alert(JSON.stringify(response.data))
            }
        } catch (error) {
            alert(JSON.stringify(error))
            // Handle any errors
            console.error(error);
        }
    }
    const createTeamsMeeting = async () => {
        const datestring = Date_ ? Date_.toLocaleString().slice(0, 10) : new Date().toLocaleString().slice(0, 10);
        const start_time = returnStartTime(datestring, timeValue, selectedTimezone);
        const end_time = returnEndTime(start_time, duration.value);
        try {
            // Make a POST request to create the meeting
            const response = await fetch('https://graph.microsoft.com/v1.0/me/onlineMeetings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${teams_access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDateTime: start_time,
                    endDateTime: end_time,
                    subject: "Teams Meeting",
                }),
            });

            if (response.ok) {
                const meetingData = await response.json();
                console.log('Meeting created:', meetingData);
            } else {
                console.error('Failed to create a meeting:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error creating a meeting:', error);
        }
    };



    const init_msalApp = () => {
        const msalApp = new UserAgentApplication(msalConfig);
        setMsalApp(msalApp);
    }
    useEffect(() => {
        shouldModalBeVisible(true);
        isUserSignedIn_zoomApi("A123", "startUp");
        // isUserSignedIn_teamApi(msalApp.getAccount());

        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setTimeValue(currentTime);
        setTimeout(() => {
            shouldModalBeVisible_(true);
        }, 600);
    }, [])


    // update state Functions
    const changeMeetingHost = (id: string) => {
        shouldModalBeVisible_(false);
        setTimeout(() => {
            setMeetingsHost(id);
            updateSignedIn(id === "zoom" ? zoomIN : teamsIN)
            shouldModalBeVisible_(true)
        }, 600);
    }
    const navigateToScreen = (id: number) => {
        if (id === 1) {
            showExtraBlocks(false);
            setTimeout(() => {
                setScreenIndex(id);
                showExtraBlocks(true);
            }, 600);
        } else if (id === 0) {
            showExtraBlocks(false);
            setTimeout(() => {
                setScreenIndex(id);
                setTimeout(() => {
                    showExtraBlocks(true);
                }, 100);
            }, 600);
        }
    }
    const setSelectedTimezone_ = (value: any) => {
        setSelectedTimezone(value);
    }
    const setTimeValue_ = (value: any) => {
        setTimeValue(value);
    }
    const setDuration_ = (value: any) => {
        setDuration(value);
    }



    const RenderHead = () => {
        return (
            <Block style={s1.head}>
                <Block style={s1.headTitleCont}>
                    <Img style={s1.headTitleIcon} src={require("../icons/VideoConference.png")} />
                    <String style={s1.headTitle}>Create a video meeting</String>
                </Block>
                <Img onTouch={() => { params.setShowModal(false) }} style={s1.headIcon} src={require("../icons/Close.png")} />
            </Block>
        )
    }
    const RenderBody = () => {
        return (
            <Block style={s1.body}>
                {screenIndex === 0 ?
                    <Block style={s1.options}>
                        {
                            signedIn ?
                                options.map((value, index, array) => {
                                    return (
                                        <Block className={"scaleOnHover pinchOnClick " + classByScale} style={s1.option} onTouch={() => { navigateToScreen(value.id) }}>
                                            <Img style={s1.optionThumnail} src={value.icon} />
                                            {
                                                value.id === 0 ?
                                                    <String style={s1.optionTitle}>Send instant <Span style={{ fontWeight: "bold" }}>{meetingsHost}</Span> meeting</String>
                                                    :
                                                    <String style={s1.optionTitle}>Schedule <Span style={{ fontWeight: "bold" }}>{meetingsHost}</Span> meeting for later</String>
                                            }
                                        </Block>
                                    )
                                })
                                :
                                <Block className={"scaleOnHover pinchOnClick " + classByScale} style={s1.option_} onTouch={() => { RequestAuth() }}>
                                    <Img style={s1.optionThumnail} src={require("../icons/user.png")} />
                                    <String style={s1.optionTitle}>Sign into <Span style={{ fontWeight: "bold" }}>{meetingsHost}</Span>, to be abble to create meetings</String>
                                </Block>
                        }
                    </Block>
                    :
                    screenIndex === 1 ?
                        <Block style={s1.options}>
                            <Block className={classByScale}>
                                <Block style={s1.scheduleHead}>
                                    <Block style={s1.scheduleCol6}>
                                        <Block style={s1.selectCalender}>
                                            <DatePicker onChange={onChangeDate} value={Date_} minDate={new Date()} format="y-MM-dd" />
                                        </Block>
                                    </Block>
                                    <Block style={s1.scheduleCol6_}>
                                        <Block style={s1.selectCalender}>
                                            <TimePicker onChange={setTimeValue_} value={timeValue} />
                                        </Block>
                                    </Block>
                                </Block>
                                <Block style={s1.scheduleHeadRows}>
                                    <Block style={s1.scheduleCol12}>
                                        <String style={{ margin: 0, marginBottom: 5 }}>Duration</String>
                                        <Dropdown
                                            options={duration_options}
                                            className="select_"
                                            placeholder={duration_options[0].label}
                                            onChange={setDuration_}
                                        />
                                    </Block>
                                    <Block style={s1.scheduleCol12}>
                                        <String style={{ marginTop: 40, marginBottom: 5 }}>Time zone</String>
                                        <TimezoneSelect
                                            value={selectedTimezone}
                                            onChange={setSelectedTimezone_}
                                        />
                                    </Block>
                                </Block>
                                <Block style={s1.scheduleHeadRows_foot}>
                                    <Block style={s1.sHR_ButtonsContainer}>
                                        <Block className={"scaleOnHover pinchOnClick "} style={s1.sHR_Buttons} onTouch={() => { navigateToScreen(0) }}>
                                            <String style={s1.sHR_Buttons_text}>Back</String>
                                        </Block>
                                        <Block className={"scaleOnHover pinchOnClick "} style={s1.sHR_Buttons_} onTouch={createMeeting}>
                                            <String style={s1.sHR_Buttons_text}>Create</String>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                        :
                        <Block style={s1.options}></Block>
                }
                {signedIn && screenIndex === 0 && <String style={s1.body_bottomText}>You are interacting as <Span style={{ color: "blue" }}>{signedIn}</Span></String>}
            </Block>
        )
    }
    const RenderFoot = () => {
        return (
            <Block className={extraBlocks ? "focusByScale" : "blurByScale"} style={s1.foot}>
                <Block style={s1.description}>
                    <Block style={s1.descriptionHead}>
                        <Block style={s1.descriHead_IconContainer}>
                            <Img src={serviceLogo(meetingsHost)} style={s1.descriHead_Icon} />
                        </Block>
                        <Block style={s1.descriHead_TitleContainer}>
                            <String style={s1.descriHead_Title}><Span>{meetingsHost}</Span> Sevice</String>
                            <String style={s1.descriHead_Text}>You are using <Span>{meetingsHost}'s</Span> video meetings</String>
                            <String style={s1.descriHead_Text}>Click from the providers below to use their service</String>
                        </Block>
                    </Block>
                </Block>
                <Block style={s1.ServicesContainer}>
                    {services.map((value) => {
                        return (
                            <Block onTouch={() => { changeMeetingHost(value.id) }} className={"scaleOnHover pinchOnClick"} style={s1.service}>
                                <Img style={s1.serviceIcon} src={value.icon} />
                                <String style={s1.serviceLable}>{value.id}</String>
                            </Block>
                        )
                    })}
                </Block>
            </Block>
        )
    }



    return (
        <Block style={s1.container}>
            <Block className={modalVisbility_ ? "popUpFocused" : "popUpBlur"} style={s1.popUp}>
                {RenderHead()}
                {RenderBody()}
                {screenIndex === 0 && RenderFoot()}
            </Block>
        </Block>
    )
}