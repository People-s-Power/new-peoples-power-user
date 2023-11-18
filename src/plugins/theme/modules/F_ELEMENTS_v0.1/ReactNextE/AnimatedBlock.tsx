
import React, { useEffect, useState } from "react";
import { F_RNext_AnimatedBlockInterface } from "../../../types/types";
// import "../../Modules/animate.css";

export default function AnimatedBlock(props: F_RNext_AnimatedBlockInterface) {
    const [animation, set_animation] = useState({});
    const [duration, set_duration] = useState({});
    const [delay, set_delay] = useState({});
    const [direction, set_direction] = useState({});
    const [easing, set_easing] = useState({});
    const [iterationCount, set_iterationCount] = useState({});
    const [iterationDelay, set_iterationDelay] = useState({});
    useEffect(() => {
        if (typeof props.animation === 'string') {
            const css = { animationName: props.animation }
            set_animation(css);
        } else {
            const animFrom = props.animation?.from;
            const animTo = props.animation?.to;
            const animation_ = { ...animFrom, transitionDuration: "600ms" };
            if (animation !== animation_) {
                set_animation(animation_);
            }
            setTimeout(() => {
                const duration = props.duration ? props.duration + "ms" : "600ms";
                const animation = { ...animTo, transitionDuration: duration };
                set_animation(animation);
            }, 100)

        }
    }, [props.animation])




    useEffect(() => {
        const duration = props.duration ? props.duration + "ms" : "600ms";
        const css = { animationDuration: duration, transitionDuration: duration };
        set_duration(css);
    }, [props.duration]);

    useEffect(() => {
        const delay = props.delay ? props.delay + "ms" : "0s";
        const css = { animationDelay: delay, transitionDelay: delay };
        set_delay(css);
    }, [props.delay]);

    useEffect(() => {
        if (props.direction) {
            const css = { animationDdrection: props.direction, animationDirection: props.direction };
            set_direction(css);
        }
    }, [props.direction]);

    useEffect(() => {
        const easing = props.easing ? props.easing : "";
        const css = { animationTimingFunction: easing, transitionTimingFunction: easing };
        set_easing(css);
    }, [props.easing]);



    const onMouseOver = () => {
        if (props.onMouseOver !== undefined) {
            props.onMouseOver()
        } 
    }
    const onMouseLeave = () => {
        if (props.onMouseLeave !== undefined) {
            props.onMouseLeave()
        } 
    }


    // useEffect(() => { }, [props.iterationCount]);
    // useEffect(() => { }, [props.iterationDelay]);
    return (
        <div
            style={{
                ...props.style,
                ...duration,
                ...animation,
                ...delay,
                ...direction,
                ...easing,
                // ...iterationCount,
                // ...iterationDelay,
            }}
            className={props.className? props.className : ""}
            id={props.id? props.id : ""}
            ref={props.ref}
            onMouseOver={()=>{ onMouseOver()}}
            onMouseLeave={()=>{ onMouseLeave()}}
        >
            {props.children}
        </div>
    )
}



// animation-name, 
// animation-duration, 
// animation-timing-function, 
// animation-delay, 
// animation-iteration-count, 
// animation-direction, 
// animation-fill-mode,    ==== REACT NATIVE ONLY
// and animation-play-state.   ==== REACT NATIVE ONLY


// transition-property,        ====  REACT AND NEXT ONLY
// transition-duration,        ====  duration
// transition-timing-function, ====  easing
// and transition-delay        ====  delay



// animation?: Animation | string | CustomAnimation;
//   duration?: number;
//   delay?: number;
//   direction?: Direction;
//   easing?: Easing;
//   iterationCount?: number | 'infinite';
//   iterationDelay?: number;
//   // transition?: keyof S | ReadonlyArray<keyof S>;
//   useNativeDriver?: boolean;
//   onAnimationBegin?: Function;
//   onAnimationEnd?: Function;
//   onTransitionBegin?: (property: string) => void;
//   onTransitionEnd?: (property: string) => void;