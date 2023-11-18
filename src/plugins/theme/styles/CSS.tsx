import React, { useState, useEffect } from "react";
import { StyleSheet_ } from "../types/types";

const getWindow = () => {
    if (typeof window === "undefined") { return null } else {return window}
}

export const ZTModalContainer = StyleSheet_.create({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "5%"
    },
    popUp: {
        width: "70%",
        height: "60%",
        maxHeight: 500,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,1)",
        maxWidth: 500,
    },

    // Head
    head: {
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "1.4%"
    },
    headTitleCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
    },
    headTitle: {
        fontSize: 25,
    },
    headTitleIcon: {
        width: 25,
        height: 25,
        marginTop: 3,
    },
    headIcon: {
        width: 30,
        height: 30,
        marginRight: 20,
        cursor: "pointer"
    },


    // Body
    body: {
        height: "58%",
        width: "100%",
        paddingTop: 10,
        padding: 5,
    },
    options: {
        display: "flex",
    },
    option: {
        width: 160,
        maxWidth: 200,
        height: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: "rgba(14,114,234,0.2)",
        margin: 10,
        borderRadius: 20,
        cursor: "pointer",
        boxShadow: "5px 5px 20px -5px rgba(0,0,0,0.2)",
    },
    option_: {
        width: 260,
        maxWidth: 200,
        height: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: "rgba(14,114,234,0.2)",
        margin: 10,
        borderRadius: 20,
        cursor: "pointer",
        boxShadow: "5px 5px 20px -5px rgba(0,0,0,0.2)",
    },
    optionThumnail: {
        width: 75,
        height: 75,
        margin: 0,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "400",
        margin: 0,
        marginTop: 0,
        textAlign: "center",
    },
    scheduleHead: {
        display: "flex",
        width: getWindow() && getWindow().innerWidth*0.68,
        maxWidth: 490,
    },
    scheduleHeadRows: {
        maxHeight: 200,
        height: 200,
        // border: "1px solid black"
    },
    scheduleCol6: {
        height: 54,
        width: "50%",
        padding: 10,
        // paddingRight: 15,
    },
    scheduleCol12: {
        height: 54,
        width: "96%",
        padding: 10,
        maxHeight: 40
    },
    selectCalender: {
        height: "100%",
        width: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 5
    },
    scheduleCol6_: {
        height: 54,
        width: "50%",
        padding: 10,
        paddingRight: "4%",
    },
    calender: {
        // position: "absolute",
    },
    body_bottomText: {
        fontSize: 12,
        paddingLeft: "4%",
        position: "relative",
        top: -10,
    },
    scheduleHeadRows_foot: {
        width: "100%",
        alignItems: "flex-end",
        paddingLeft: "30%",
        marginTop: "2%",
    },
    sHR_ButtonsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sHR_Buttons: {
        cursor: "pointer"
    },
    sHR_Buttons_: {
        backgroundColor: "rgba(14,114,234,0.2)",
        borderRadius: 10,
        cursor: "pointer",

    },
    sHR_Buttons_text: {
        fontSize: 15,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: "bold"
    },


    // Foot
    foot: {
        height: "30%",
        // backgroundColor: "rgba(33,44,244,0.05)",
    },
    description: {
        width: "95%",
        padding: 10,
    },
    descriptionHead: {
        width: "100%",
        display: "flex",
        // alignItems: "center"
    },
    descriHead_IconContainer: {
        height: 160,
        width: 160,
        borderRadius: 30,
        backgroundColor: "white",
        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    descriHead_Icon: {
        height: 45,
        width: 45,
        objectFit: "contain"
    },
    descriHead_TitleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "8%",
    },
    descriHead_Title: {
        fontSize: 12,
        fontWeight: "bold",
        margin: 0,
        marginLeft: 10,
    },
    descriHead_Text: {
        fontSize: 12,
        margin: 0,
        marginLeft: 10,
    },
    ServicesContainer: {
        height: 80,
        width: "60%",
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -20,
        // marginLeft: 10,
        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.2)",
        display: "flex",
        padding: 1,
        marginLeft: "40%"
    },
    service: {
        height: "87%", 
        width: "50%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "-5px 5px 30px -5px rgba(0,0,0,0.2)",
        margin: "1%",
        cursor: "pointer",
    },
    serviceIcon: {
        width: 30, 
        height: 30,
        objectFit: "contain"
    },
    serviceLable: {
        fontSize: 11,
        fontWeight: "bold",
        margin: 0
    }
})

export const ZTModalContainer_dropdown = StyleSheet_.create({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "5%"
    },
    popUp: {
        width: "100%",
        height: "70%",
        maxHeight: 700,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,1)",
        // maxWidth: 500,
    },

    // Head
    head: {
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: "5%",
        paddingTop: "1.5%",
        paddingBottom: "13%",
        borderTop: "0.3px solid rgba(0,0,0,0.3)",
        borderBottom: "0.3px solid rgba(0,0,0,0.3)",
    },
    headTitleCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    headTitle: {
        fontSize: 25,
    },
    headTitleIcon: {
        width: 25,
        height: 25,
        marginTop: 3,
    },
    headIcon: {
        width: 30,
        height: 30,
        marginRight: 20,
        cursor: "pointer"
    },


    // Body
    body: {
        height: "58%",
        width: "100%",
        paddingTop: 10,
        padding: 5,
    },
    options: {
        display: "flex",
        position: "relative",
        width: "100%",
    },
    option: {
        width: 160,
        maxWidth: 200,
        height: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: "rgba(14,114,234,0.2)",
        margin: 10,
        borderRadius: 20,
        cursor: "pointer",
        boxShadow: "5px 5px 20px -5px rgba(0,0,0,0.2)",
    },
    option_: {
        width: 260,
        maxWidth: 200,
        height: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: "rgba(14,114,234,0.2)",
        margin: 10,
        borderRadius: 20,
        cursor: "pointer",
        boxShadow: "5px 5px 20px -5px rgba(0,0,0,0.2)",
    },
    optionThumnail: {
        width: 75,
        height: 75,
        margin: 0,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "400",
        margin: 0,
        marginTop: 0,
        textAlign: "center",
    },
    scheduleHead: {
        display: "flex",
        width: getWindow() && getWindow().innerWidth*0.475,
        // maxWidth: 490,
    },
    scheduleHeadRows: {
        maxHeight: 200,
        height: 200,
        // border: "1px solid black"
    },
    scheduleCol6: {
        height: 54,
        width: 200,
        padding: 10,
        paddingLeft: 5,
    },
    scheduleCol12: {
        height: 54,
        width: 540,
        padding: 10,
        paddingLeft: 5,
        maxHeight: 40
    },
    scheduleCol12_: {
        height: 54,
        width: "96%",
        padding: 10,
        maxHeight: 40
    },
    selectCalender: {
        height: "100%",
        width: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 5
    },
    scheduleCol6_: {
        height: 54,
        width: 200,
        padding: 10,
        paddingRight: "4%",
    },
    calender: {
        // position: "absolute",
    },
    body_bottomText: {
        fontSize: 12,
        paddingLeft: "4%",
        position: "relative",
        top: -10,
    },
    scheduleHeadRows_foot: {
        width: "100%",
        alignItems: "flex-end",
        // paddingLeft: "30%",
        // marginTop: "2%",
    },
    sHR_ButtonsContainer: {
        display: "flex",
        marginTop: 13
        // justifyContent: "center",
        // alignItems: "center",
    },
    sHR_Buttons: {
        cursor: "pointer"
    },
    sHR_Buttons_: {
        backgroundColor: "rgba(14,114,234,0.2)",
        borderRadius: 10,
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center"

    },
    sHR_Buttons_text: {
        fontSize: 15,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: "400",
        // marginBottom: 10,
    },
    sHR_Buttons_text__: {
        fontSize: 15,
        fontWeight: "400",
        marginBottom: 10,
        paddingTop: 0,
        paddingBottom: 0,
    },
    sHR_Buttons_text_: {
        fontSize: 11,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: "400",
        marginTop: 10,
    },


    // Foot
    foot: {
        height: "30%",
        // backgroundColor: "rgba(33,44,244,0.05)",
    },
    description: {
        width: "95%",
        padding: 10,
    },
    descriptionHead: {
        width: "100%",
        display: "flex",
        // alignItems: "center"
    },
    descriHead_IconContainer: {
        height: 160,
        width: 160,
        borderRadius: 30,
        backgroundColor: "white",
        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    descriHead_Icon: {
        height: 45,
        width: 45,
        objectFit: "contain"
    },
    descriHead_TitleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "8%",
    },
    descriHead_Title: {
        fontSize: 12,
        fontWeight: "bold",
        margin: 0,
        marginLeft: 10,
    },
    descriHead_Text: {
        fontSize: 12,
        margin: 0,
        marginBottom: 5,
        // marginLeft: 10,
    },
    descriHead_Text_: {
        fontSize: 12,
        margin: 0,
        marginTop: 5,
        marginBottom: 5,
        // marginLeft: 10,
    },
    ServicesContainer: {
        height: 80,
        width: "60%",
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -20,
        // marginLeft: 10,
        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.2)",
        display: "flex",
        padding: 1,
        marginLeft: "40%"
    },
    service: {
        height: "87%", 
        width: "50%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "-5px 5px 30px -5px rgba(0,0,0,0.2)",
        margin: "1%",
        cursor: "pointer",
    },
    serviceIcon: {
        width: 30, 
        height: 30,
        objectFit: "contain"
    },
    serviceLable: {
        fontSize: 11,
        fontWeight: "bold",
        margin: 0
    }
})
