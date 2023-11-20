import React, { CSSProperties, ReactElement, ReactPortal, useEffect, useState, HTMLAttributes, ReactNode } from "react";
import { Easing, Animation, CustomAnimation, Direction } from "../modules";



export interface ZTModal_interface {
  style?: CSSProperties,
  framework?: "REACTJS" | "NEXTJS" | "REACT-NATIVE",
  setShowModal?: any,
  setMeetingsHost_?: any,
  meetingsFN?: any,
  userId?: any,
  meetingLink?: any,
  setMeetingsLink?: any,
  setStartDate?: any,
  setEndDate?: any
  setTime?: any,
};

export interface meetings_interface {
  style?: CSSProperties,
  theme?: "dropdowm" | "modal",
  setShowModal?: any,
  setMeetingsHost_?: any,
  meetingsFN?: any,
  userId?: any,
  meetingLink?: any,
  setMeetingsLink?: any,
  setStartDate?: any,
  setEndDate?: any
  setTime?: any,
};



export type F_ELEMENTS_interface = {
  className?: any,
  id?: any,
  style?: CSSProperties,
  framework?: "REACTJS" | "NEXTJS" | "REACT-NATIVE",
  children?: ReactNode,
  onTouch?: any,
};
export type F_ELEMENTS_IMGInterface = {
  className?: any,
  id?: any,
  style?: CSSProperties,
  framework?: "REACTJS" | "NEXTJS" | "REACT-NATIVE",
  children?: ReactNode
  src?: string,
  onTouch?: any,
};
export type F_ELEMENTS_AnimatedBlockinterface = {
  ref?: any,
  className?: any,
  id?: any,
  style?: CSSProperties,
  framework?: "REACTJS" | "NEXTJS" | "REACT-NATIVE",
  children?: ReactNode,
  src?: string,
  onTouch?: any,
  onClick?: object,
  onMouseOver?: object,
  onMouseLeave?: object,
  // Derived from react-native-animatable
  animation?: string | Animation | CustomAnimation;
  duration?: number;
  delay?: number;
  direction?: Direction;
  easing?: Easing;
  iterationCount?: number | 'infinite';
  iterationDelay?: number;
  // transition?: keyof S | ReadonlyArray<keyof S>;
  useNativeDriver?: boolean;
  onAnimationBegin?: Function;
  onAnimationEnd?: Function;
  onTransitionBegin?: (property: string) => void;
  onTransitionEnd?: (property: string) => void;
};


export type F_RNext_interface = {
  className?: any,
  id?: any,
  style?: CSSProperties,
  children?: ReactNode,
  onTouch?: any,
};
export type F_RNext_IMGInterface = {
  className?: any,
  id?: any,
  style?: CSSProperties,
  children?: ReactNode,
  src?: string,
  onTouch?: any,
  framework?: "REACTJS" | "NEXTJS" | "REACT-NATIVE",
};
export type F_RNext_AnimatedBlockInterface = {
  ref?: any,
  className?: any,
  id?: any,
  style?: CSSProperties,
  children?: ReactNode,
  src?: string,
  onTouch?: any,
  onClick?: object,
  onMouseOver?: any,
  onMouseLeave?: any,
  // Derived from react-native-animatable
  animation?: Animation | string | CustomAnimation;
  duration?: number;
  delay?: number;
  direction?: Direction;
  easing?: Easing;
  iterationCount?: number | 'infinite';
  iterationDelay?: number;
  // transition?: keyof S | ReadonlyArray<keyof S>;
  useNativeDriver?: boolean;
  onAnimationBegin?: Function;
  onAnimationEnd?: Function;
  onTransitionBegin?: (property: string) => void;
  onTransitionEnd?: (property: string) => void;
};


type CSSProperties_ = {
  [key: string]: React.CSSProperties;
};

export class StyleSheet_ {
  static create<Styles extends CSSProperties_>(styles: Styles): Styles {
    return styles;
  };
};



