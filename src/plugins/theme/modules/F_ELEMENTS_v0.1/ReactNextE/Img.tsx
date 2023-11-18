
import React from "react";
import Image from 'next/image'
import { F_RNext_IMGInterface } from "../../../types/types";

export default function Block(props: F_RNext_IMGInterface) {
    return (
        props.framework === "NEXTJS" ?
            <Image src={props.src} width={props.style.width} height={props.style.height} onClick={props.onTouch}/>
            :
            <img {...props} onClick={props.onTouch}>{props.children}</img>
    )
}
