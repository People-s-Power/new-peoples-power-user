import React, { CSSProperties, ReactElement, ReactPortal, useEffect, useState } from "react";
import * as ReactNextE from "../ReactNextE";
import { F_ELEMENTS_interface } from "../../../types/types";




// Later would import both React native and React Next for multi framework development
export default function Span(params:F_ELEMENTS_interface) {
    return (
        <ReactNextE.Span {...params}>{params.children}</ReactNextE.Span>
    )
}

