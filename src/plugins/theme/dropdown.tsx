import React, { CSSProperties, createRef, useEffect, useRef, useState } from "react";
import { AnimatedBlock, Block, Img, Span, String } from "./modules/F_ELEMENTS_v0.1";
import { ZTModal_interface } from "./types/types";
import { options, s2, serviceLogo, dropdown_services, ValuePiece, Value, duration_options, _ext, SERVER_URL_ztAPI } from "./modules/includes";
// import "./styles/CSS.css";

// install these packages or add them to your package.json and run npm install 
// --> react-date-picker react-time-picker react-dropdown react-timezone-select 
// --> msal axios date-fns date-fns-tz @azure/msal-react @microsoft/microsoft-graph-client @azure/msal-browser
// or install a JointDependacy from https://github.com/JerrySplendour-ReactJSDependencies
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Dropdown from 'react-dropdown';
import TimezoneSelect from 'react-timezone-select'
// import { UserAgentApplication } from 'msal';
import axios from "axios";
import { format, parse, addMinutes } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';


import { config } from "./modules/msalConfig";




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
const returnEndDate = (startDate: any, startTime: any, durationInMinutes: any) => {
    // Validate startDate and startTime
    if (!startDate || !startTime) {
        // Handle invalid input values
        console.error('Invalid input values: startDate or startTime is missing.');
        return null; // or handle the error appropriately
    }

    const parsedStartDate = new Date(startDate);

    // Validate parsedStartDate
    if (isNaN(parsedStartDate.getTime())) {
        // Handle invalid parsedStartDate
        console.error('Invalid startDate:', startDate);
        return null; // or handle the error appropriately
    }

    // Check if the startTime is in 24-hour format without AM/PM
    const is24HourFormat = /^\d{2}:\d{2}$/.test(startTime);
    let hours, minutes;

    if (is24HourFormat) {
        // Parse 24-hour format directly
        [hours, minutes] = startTime.split(':').map(Number);
    } else {
        // Parse the time with AM/PM indicator
        const [time, period] = startTime.split(' ');
        [hours, minutes] = time.split(':').map(Number);

        // Validate originalHours, minutes, and period
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 ||
            minutes < 0 || minutes >= 60 || (period !== 'AM' && period !== 'PM')) {
            // Handle invalid time or period
            console.error('Invalid startTime:', startTime);
            return null; // or handle the error appropriately
        }

        // Adjust hours for PM period
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        }
    }

    parsedStartDate.setHours(hours);
    parsedStartDate.setMinutes(minutes);

    const endDate = new Date(parsedStartDate.getTime() + durationInMinutes * 60 * 1000);

    // Validate endDate
    if (isNaN(endDate.getTime())) {
        // Handle invalid endDate
        console.error('Invalid endDate:', endDate);
        return null; // or handle the error appropriately
    }

    const formattedEndDate = endDate.toISOString().split('T')[0];

    return formattedEndDate;
}
function returnShortDate(longDateFormat: any) {
    const longDate = new Date(longDateFormat);

    // Extract the date components
    const year = longDate.getFullYear();
    const month = (longDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = longDate.getDate().toString().padStart(2, '0');

    // Assemble the short date format
    const shortDateFormat = `${year}-${month}-${day}`;

    return shortDateFormat;
}
const convertTo24HourFormat = (time12Hour: any) => {
    // Check if time12Hour is null or empty
    if (!time12Hour) {
        console.error('Invalid input value: time12Hour is null or empty.');
        return null; // or handle the error appropriately
    }

    // Split the time12Hour value if it contains a space (indicating AM/PM)
    const timeParts = time12Hour.split(' ');
    let time = '';
    let period = '';

    if (timeParts.length === 2) {
        [time, period] = timeParts;
    } else {
        time = time12Hour;
    }

    const [originalHoursString, minutesString] = time.split(':');
    const originalHours = Number(originalHoursString);
    const minutes = Number(minutesString);

    // Validate originalHours, minutes, and period
    if (isNaN(originalHours) || isNaN(minutes) || originalHours < 0 || originalHours >= 24 || minutes < 0 || minutes >= 60 ||
        (period && period !== 'AM' && period !== 'PM')) {
        // Handle invalid time, minutes, or period
        console.error('Invalid time12Hour:', time12Hour);
        return null; // or handle the error appropriately
    }

    // Adjust hours for PM period
    let adjustedHours = originalHours;
    if (period === 'PM' && adjustedHours !== 12) {
        adjustedHours += 12;
    } else if (period === 'AM' && adjustedHours === 12) {
        adjustedHours = 0;
    }

    // Ensure two-digit formatting
    const formattedHours = adjustedHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const time24Hour = `${formattedHours}:${formattedMinutes}`;

    return time24Hour;
}





export function DropdownTheme(params: ZTModal_interface) {
    //create meetings params
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [timeValue, setTimeValue] = useState('10:00');
    const [Date_, onChangeDate] = useState<Value>(new Date());
    const [duration, setDuration] = useState(duration_options[0]);
    ////////////////
    //create Microsoft Teams meeting params
    // const [teams_user, set_teams_user] = useState("");
    const { instance, accounts, inProgress } = useMsal();
    const [teams_access_token, set_teams_access_token] = useState(null);
    const [requestedAUth, setRequestedAUth] = useState(false);
    ////////////////
    const [modalVisbility, shouldModalBeVisible] = useState(false);
    const [modalVisbility_, shouldModalBeVisible_] = useState(false);
    const [extraBlocks, showExtraBlocks] = useState(true);
    const [screenIndex, setScreenIndex] = useState(1);
    const [meetingsHost, setMeetingsHost] = useState("zoom");
    const classByScale = extraBlocks ? "focusByScale" : "blurByScale";
    const [zoomIN, setZoomIn] = useState("");
    const [teamsIN, setTeamsIn] = useState("");
    const [signedIn, updateSignedIn] = useState(meetingsHost === "zoom" ? zoomIN : teamsIN);
    const [noOfAtempts, incrementNoOfAtempts] = useState(0);
    const [popUpWindow, setPopUpWindow] = useState(null);
    const popUpWindowRef = useRef(null);



    // const [msalApp, setMsalApp] = useState(new UserAgentApplication(msalConfig));






    const isUserSignedIn_zoomApi = async (id: any, init: any) => {
        if (!id) {
            if (noOfAtempts > 4) {
                setTimeout(() => {
                    incrementNoOfAtempts(noOfAtempts + 1);
                    isUserSignedIn_zoomApi(params.userId, init);
                }, 1000);
            } else {
                console.error("error", "no userID");
            }
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
                    setZoomIn(email);
                    updateSignedIn(meetingsHost === "zoom" ? email : teamsIN)
                }
            } catch (error) {
                // Handle any errors
                console.error(error);
            }
        }
    }
    const isUserSignedIn_teamApi = async (user: any) => {
        if (accounts.length > 0 && inProgress === "none") {
            const email = accounts[0].name;
            setTeamsIn(email);
            updateSignedIn(meetingsHost === "zoom" ? zoomIN : email);
        }
    }
    //Request User Auth
    const RequestAuth = () => {
        const request_auth = () => meetingsHost === "zoom" ? RequestAuth_zoom() : RequestAuth_teams();
        request_auth();
    }
    const RequestAuth_zoom = async () => {
        try {
            const response = await axios.get(`${SERVER_URL_ztAPI}/authorize_zoom${_ext}`);

            const authUrl = response.data;
            popUpWindowRef.current = window.open(authUrl, 'Zoom Auth', 'width=600,height=600');
        } catch (error) {
            console.error(error);
        }
    };
    const closePopUpWindow = () => {
        if (popUpWindow) {
            popUpWindow.close();
            setPopUpWindow(null);
        }
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (popUpWindowRef.current && popUpWindowRef.current.closed) {
                clearInterval(intervalId);
                isUserSignedIn_zoomApi(params.userId, "startUp");
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const RequestAuth_teams = async () => {
        try {
            // Use the existing loginPopup method to initiate the login process
            await instance.loginPopup({
                scopes: config.scopes,
                prompt: 'select_account'
            });
            acquireTeamsAccessToken();
        } catch (error) {
            console.error(error);
        }
    };
    const acquireTeamsAccessToken = async () => {
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: config.scopes,
                account: accounts[0]
            });
            set_teams_access_token(tokenResponse.accessToken);
            // await createTeamsMeeting(tokenResponse.accessToken);
        } catch (error) {
            console.error('Error acquiring access token:', error);

            // If token refresh fails, prompt the user to log in again
            // await handleLogin();
        }
    };
    const acquireTeamsAccessToken_returnType = async () => {
        alert("Starting to Access Token");
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: config.scopes,
                account: accounts[0]
            });
            set_teams_access_token(tokenResponse.accessToken);
            alert("Token Response: " + JSON.stringify(tokenResponse));
            const type = {status: "done", message: tokenResponse.accessToken};
            return type;
            // await createTeamsMeeting(tokenResponse.accessToken);
        } catch (error) {
            const type = {status: "error", message: 'Error acquiring access token: ' + error}
            console.error(type.message);
            alert(type.message);
            return type;

            // If token refresh fails, prompt the user to log in again
            // await handleLogin();
        }
    };

    //create meetings functions
    const createMeeting = async () => {
        const create_meeting = () => meetingsHost === "zoom" ? createZoomMeeting() : createTeamsMeeting();
        create_meeting();
    }
    const createZoomMeeting = async () => {
        const datestring = Date_ ? Date_.toLocaleString().slice(0, 10) : new Date().toLocaleString().slice(0, 10);
        const start_time = returnStartTime(datestring, timeValue, selectedTimezone);
        const id = params.userId;

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = { id, start_time, duration: duration.value };
            const response = await axios.post(`${SERVER_URL_ztAPI}/createZoomMeeting`, data, { headers });
            if (response.data) {
                // alert(JSON.stringify(response.data));
                params.setMeetingsLink(response.data.join_url)
            }
        } catch (error) {
            alert(error)
            // Handle any errors
            console.error(error);
        }
    }
    const createTeamsMeeting = async () => {
        if (!teams_access_token) {
            alert("No Access Token");
            const accessToken = await acquireTeamsAccessToken_returnType();
            if (accessToken.status === "done") {
                alert("Access Token acquired successfully");
                createTeamsMeeting_withAccessToken(accessToken.message);
            } else {
                alert(accessToken.message)
            }
        } else {
            createTeamsMeeting_withAccessToken(teams_access_token);
        }
    };
    
    const createTeamsMeeting_withAccessToken = async (accessToken: any) => {
        if (!accessToken) {
            alert("No Access Token after acquiring");
        } else {
            const datestring = Date_ ? Date_.toLocaleString().slice(0, 10) : new Date().toLocaleString().slice(0, 10);
            const start_time = returnStartTime(datestring, timeValue, selectedTimezone);
            const end_time = returnEndTime(start_time, duration.value);
            try {
                const client = Client.init({
                    authProvider: (done) => {
                        done(null, accessToken);
                    },
                });

                const meeting = await client.api('/me/onlineMeetings').post({
                    startDateTime: start_time,
                    // startDateTime: new Date().toISOString(),
                    endDateTime: end_time,
                    // endDateTime: new Date(new Date().getTime() + 3600000).toISOString(),
                    subject: 'My Teams Meeting',
                });

                alert('Meeting created:' + JSON.stringify(meeting));
                // console.log('Meeting created:', meeting);
            } catch (error) {
                alert('Error creating meeting:' + JSON.stringify(error));
            }
        }
    };


    useEffect(() => {
        // shouldModalBeVisible(true);
        isUserSignedIn_zoomApi(params.userId, "startUp");
        isUserSignedIn_teamApi(accounts);

        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setTimeValue(currentTime);

        params.setStartDate(returnShortDate(Date_));
        params.setEndDate(returnEndDate(Date_, currentTime, duration.value));
        params.setTime(convertTo24HourFormat(currentTime));
        setTimeout(() => {
            shouldModalBeVisible_(true);
        }, 600);
    }, [])




    // update state Functions
    const changeMeetingHost = (value: any) => {
        shouldModalBeVisible_(false);
        setTimeout(() => {
            setMeetingsHost(value.value);
            updateSignedIn(value.value === "zoom" ? zoomIN : teamsIN)
            shouldModalBeVisible_(true)
        }, 600);
    }

    const setSelectedTimezone_ = (value: any) => {
        setSelectedTimezone(value);
    }
    const onChangeDate_ = (value: any) => {
        onChangeDate(value);
        params.setStartDate(returnShortDate(value))
        params.setEndDate(returnEndDate(value, timeValue, duration.value));
    }
    const setTimeValue_ = (value: any) => {
        setTimeValue(value);
        params.setTime(convertTo24HourFormat(value));
        params.setEndDate(returnEndDate(Date_, value, duration.value));
    }
    const setDuration_ = (value: any) => {
        setDuration(value);
        params.setEndDate(returnEndDate(Date_, timeValue, value.value));
    }



    const RenderHead = () => {
        return (
            <Block style={s2.head}>
                <Block style={s2.headTitleCont}>
                    <Img framework={"NEXTJS"} style={s2.headTitleIcon} src={require("../icons/VideoConference.png")} />
                    <String style={s2.headTitle}>Create a video meeting</String>
                </Block>
                <Block style={s2.scheduleCol12_}>
                    <String style={s2.descriHead_Text}>Click from the providers below to use their service</String>
                    <Dropdown
                        options={dropdown_services}
                        className="select_"
                        // placeholder={dropdown_services[0].label}
                        placeholder={meetingsHost}
                        onChange={changeMeetingHost}
                    />
                    <String style={s2.descriHead_Text_}>You are using <Span>{meetingsHost}'s</Span> video meetings</String>
                </Block>
                {/* <Img framework={"NEXTJS"} onTouch={() => { params.setShowModal(false) }} style={s2.headIcon} src={require("../icons/Close.png")} /> */}
            </Block>
        )
    }
    const RenderBody = () => {
        return (
            <Block style={s2.body}>
                {!signedIn ?
                    <Block style={s2.options}>
                        <Block className={"scaleOnHover pinchOnClick " + classByScale} style={s2.option_} onTouch={() => { inProgress === "none" ? RequestAuth() : null }}>
                            <Img framework={"NEXTJS"} style={s2.optionThumnail} src={require("../icons/user.png")} />
                            <String style={s2.optionTitle}>Sign into <Span style={{ fontWeight: "bold" }}>{meetingsHost}</Span>, to be abble to create meetings</String>
                        </Block>
                    </Block>
                    :
                    <Block style={s2.options}>
                        <Block className={classByScale}>
                            <Block style={s2.scheduleHead}>
                                <Block style={s2.scheduleCol6}>
                                    <Block style={s2.selectCalender}>
                                        <DatePicker onChange={onChangeDate_} value={Date_} minDate={new Date()} format="y-MM-dd" />
                                    </Block>
                                </Block>
                                <Block style={s2.scheduleCol6_}>
                                    <Block style={s2.selectCalender}>
                                        <TimePicker onChange={setTimeValue_} value={timeValue} />
                                    </Block>
                                </Block>
                            </Block>
                            <Block style={s2.scheduleHeadRows}>
                                <Block style={s2.scheduleCol12}>
                                    <String style={{ margin: 0, marginBottom: 5 }}>Duration</String>
                                    <Dropdown
                                        options={duration_options}
                                        className="select_"
                                        placeholder={duration_options[0].label}
                                        onChange={setDuration_}
                                    />
                                </Block>
                                <Block style={s2.scheduleCol12}>
                                    <String style={{ marginTop: 40, marginBottom: 5 }}>Time zone</String>
                                    <TimezoneSelect
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone_}
                                    />
                                    {signedIn && <String style={s2.sHR_Buttons_text_}>You are interacting as <Span style={{ color: "blue", fontSize: 11 }}>{signedIn}</Span></String>}
                                    <String style={s2.sHR_Buttons_text__}>Click the button bellow to Generate meeting link</String>
                                </Block>
                            </Block>
                            <Block style={s2.sHR_ButtonsContainer}>
                                <Block className={"scaleOnHover pinchOnClick "} style={s2.sHR_Buttons_} onTouch={createMeeting}>
                                    <String style={s2.sHR_Buttons_text}>Generate</String>
                                </Block>
                                <Block style={s2.sHR_Buttons}>
                                    <String style={s2.sHR_Buttons_text}>{params.meetingLink ? params.meetingLink : meetingsHost + "'s meeting link"}</String>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                }
            </Block>
        )
    }



    return (
        <>
            <Block className={modalVisbility_ ? "popUpFocused" : "popUpBlur"} style={s2.popUp}>
                {RenderHead()}
                {RenderBody()}
            </Block>
        </>
    )
}