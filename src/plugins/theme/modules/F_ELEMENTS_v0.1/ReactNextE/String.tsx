
import React from "react";
import { F_RNext_interface } from "../../../types/types";

export default function Block (props:F_RNext_interface) {
    return(
        <p {...props}>{props.children}</p>
    )
}

