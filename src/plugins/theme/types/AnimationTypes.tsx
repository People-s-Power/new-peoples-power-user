// export interface CustomAnimation<T = TextStyle & ViewStyle & ImageStyle> {
//     from?: T;
//     to?: T;
//     style?: T;
//     easing?: Easing;
//     [progress: number]: T;
//   }

import { TextStyle, ViewStyle, ImageStyle } from "./StyleSheetTypes";

export interface CustomAnimation<T = TextStyle & ViewStyle & ImageStyle> {
    from?: T;
    to?: T;
    style?: T;
    easing?: Easing;
    [progress: number]: T;
}

export type Direction =
    'normal' |
    'reverse' |
    'alternate' |
    'alternate-reverse';

export type EasingFunction = { (t: number): number };
export type Easing =
    'linear' |
    'ease' |
    'ease-in' |
    'ease-out' |
    'ease-in-out' |
    'ease-in-cubic' |
    'ease-out-cubic' |
    'ease-in-out-cubic' |
    'ease-in-circ' |
    'ease-out-circ' |
    'ease-in-out-circ' |
    'ease-in-expo' |
    'ease-out-expo' |
    'ease-in-out-expo' |
    'ease-in-quad' |
    'ease-out-quad' |
    'ease-in-out-quad' |
    'ease-in-quart' |
    'ease-out-quart' |
    'ease-in-out-quart' |
    'ease-in-quint' |
    'ease-out-quint' |
    'ease-in-out-quint' |
    'ease-in-sine' |
    'ease-out-sine' |
    'ease-in-out-sine' |
    'ease-in-back' |
    'ease-out-back' |
    'ease-in-out-back' |
    EasingFunction;


export type Animation =
    'bounce' |
    'flash' |
    'jello' |
    'pulse' |
    'rotate' |
    'rubberBand' |
    'shake' |
    'swing' |
    'tada' |
    'wobble' |
    'bounceIn' |
    'bounceInDown' |
    'bounceInUp' |
    'bounceInLeft' |
    'bounceInRight' |
    'bounceOut' |
    'bounceOutDown' |
    'bounceOutUp' |
    'bounceOutLeft' |
    'bounceOutRight' |
    'fadeIn' |
    'fadeInDown' |
    'fadeInDownBig' |
    'fadeInUp' |
    'fadeInUpBig' |
    'fadeInLeft' |
    'fadeInLeftBig' |
    'fadeInRight' |
    'fadeInRightBig' |
    'fadeOut' |
    'fadeOutDown' |
    'fadeOutDownBig' |
    'fadeOutUp' |
    'fadeOutUpBig' |
    'fadeOutLeft' |
    'fadeOutLeftBig' |
    'fadeOutRight' |
    'fadeOutRightBig' |
    'flipInX' |
    'flipInY' |
    'flipOutX' |
    'flipOutY' |
    'lightSpeedIn' |
    'lightSpeedOut' |
    'slideInDown' |
    'slideInUp' |
    'slideInLeft' |
    'slideInRight' |
    'slideOutDown' |
    'slideOutUp' |
    'slideOutLeft' |
    'slideOutRight' |
    'zoomIn' |
    'zoomInDown' |
    'zoomInUp' |
    'zoomInLeft' |
    'zoomInRight' |
    'zoomOut' |
    'zoomOutDown' |
    'zoomOutUp' |
    'zoomOutLeft' |
    'zoomOutRight';