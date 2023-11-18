import React, { useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';

const ZoomScheduler = () => {
  const [meetingId, setMeetingId] = useState('');
  const [tokenResponse, setTokenResponse] = useState('');
  const [accountId, setAccountId] = useState("39g325kmRMWjCotYISjLmA");
  const [clientId, setAClientId] = useState("Rt5mkyQZQTmoKeKOfPaqrw");
  const [clientSecret, setClientSecret] = useState("4qTpYQvtnqscv94j7WN1Mgrk8Rs51qrY");
  const BasicEncode = Base64.encode(`${clientId}:${clientSecret}`);

  const getToken = async () => {
    try {
      const response = await axios.post('https://zoom.us/oauth/token', {
        grant_type: 'account_credentials',
        account_id: accountId,
      }, {
        headers: {
          'Authorization': `Basic ${BasicEncode}`, // Replace with your access token
        },
      });

      setMeetingId(response.data);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  const scheduleMeeting = async () => {
    try {
      const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
        topic: 'My Scheduled Meeting',
        type: 2, // Scheduled Meeting
        start_time: '2023-10-11T14:00:00Z', // Set the meeting start time
        duration: 60, // Meeting duration in minutes
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjBhMjFmMmY1LTAxNDItNDk0Zi04MzI4LWJhOGMzOWE0MjkyMiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJ0Y1dfbE0yVFNTaWVpY3djUVpBc19RIiwidmVyIjo5LCJhdWlkIjoiYTU2NzVlZjdjNGFkYTg3ZmEwNjU2MmE1ZjUxMTZlMWYiLCJuYmYiOjE2OTc1NTI3MTksImNvZGUiOiJuZ3I3MGdPa1JvYXdvVjhuSVViUGdRaXFnSEFwUmx5eFEiLCJpc3MiOiJ6bTpjaWQ6UnQ1bWt5UVpRVG1vS2VLT2ZQYXFydyIsImdubyI6MCwiZXhwIjoxNjk3NTU2MzE5LCJ0eXBlIjozLCJpYXQiOjE2OTc1NTI3MTksImFpZCI6IjM5ZzMyNWttUk1XakNvdFlJU2pMbUEifQ.Ly0K_QeZrkup49p1Aw5UXGFDqK7-9hzlTU3UJ6255adMcgIolQYDuLWTxD9mcJdcdKTqLrFo9gqcslOpvQRlNg', // Replace with your access token
        },
      });

      setMeetingId(response.data.id);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const SchM = async (params: any) => {

    const endpoint = "http://localhost:4000/receiver.php";
    const formData = new FormData();
    formData.append('sender_id', "example");
    formData.append('uniqueID', "nothinng");

    // axios.post(endpoint, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then(async (responseJson) => {
    //     alert(JSON.stringify(responseJson.data))
    //   })
    //   .catch(async (error) => {
    //     alert(error)
    //   })


    fetch(endpoint, {
      body: formData, // data you send.
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, cors, *same-origin
      // redirect: 'follow', // *manual, follow, error
      // referrer: 'no-referrer', // *client, no-referrer
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        alert(responseJson);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const postData = async () => {
    try {
      const headers = {
        // 'Authorization': 'Bearer your-token',
        'Content-Type': 'application/json',
      };
  
      const data = {
        key1: 'value1',
        key2: 'value2',
      };
      const response = await axios.post('http://localhost:4000/api/endpoint', data, { headers });
      setMeetingId(response.data);
    } catch (error) {
      alert(error);
    }
  }



  return (
    <div>
    {meetingId && <p>Meeting ID: {JSON.stringify(meetingId)}</p>}
      <button onClick={postData}>Schedule Meeting</button>
      {tokenResponse && <p>token information: {JSON.stringify(tokenResponse)}</p>}
    </div>
  );
};

export default ZoomScheduler;
