import React, { CSSProperties, ReactElement, ReactPortal, useEffect, useState } from "react";
import * as ReactNextE from "../ReactNextE";
import { F_ELEMENTS_AnimatedBlockinterface } from "../../../types/types";



// Later would import both React native and React Next for multi framework development
export default function AnimatedBlock(params: F_ELEMENTS_AnimatedBlockinterface) {
    return (
        <ReactNextE.AnimatedBlock {...params}>{params.children}</ReactNextE.AnimatedBlock>
    )
}
