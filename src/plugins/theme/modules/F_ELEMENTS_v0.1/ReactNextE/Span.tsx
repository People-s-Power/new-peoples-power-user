
import React from "react";
import { F_RNext_interface } from "../../../types/types";

export default function Span (props:F_RNext_interface) {
    return(
        <span {...props}>{props.children}</span>
    )
}

