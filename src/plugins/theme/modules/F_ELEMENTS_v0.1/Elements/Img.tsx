import React, { CSSProperties, ReactElement, ReactPortal, useEffect, useState } from "react";
import * as ReactNextE from "../ReactNextE";
import { F_ELEMENTS_IMGInterface } from "../../../types/types";


// Later would import both React native and React Next for multi framework development
export default function Img(params:F_ELEMENTS_IMGInterface) {
    return (
        <ReactNextE.Img {...params}>{params.children}</ReactNextE.Img>
    )
}
