import React, { CSSProperties, createRef, useEffect, useState } from "react";
import { meetings_interface } from "./theme/types/types";
import { DropdownTheme } from "./theme/dropdown";
import { ModalTheme } from "./theme/modal";
export { _ext as _ext } from "./theme/modules/includes";







export function ViewBox(params: meetings_interface) {
  const { theme, setShowModal } = params;
  return (
    theme === "dropdowm" ?
      <DropdownTheme {...params} setShowModal={true} />
      :
      <ModalTheme {...params} setShowModal={setShowModal} />
  )
}

export const displayData = (params: any) => {
  alert(JSON.stringify(params));
}

export function usePopupWindow(popupWindow) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (popupWindow) {
      setIsPopupOpen(true);
      const checkPopupClosed = setInterval(() => {
        if (popupWindow.closed) {
          // The popup is closed
          setIsPopupOpen(false);
          clearInterval(checkPopupClosed);
        }
      }, 1000);
    } else {
      setIsPopupOpen(false);
    }
  }, [popupWindow]);

  return isPopupOpen;
}

// export function retryFunction(times:any, fn:any) {
  
// }




// const [popupWindow, setPopupWindow] = useState(null);
// const [listenToPopup, setValueOf_listenToPopup] = useState(false);
// const isPopupOpen = CreateMeeting.usePopupWindow(popupWindow);

// useEffect(() => {
// 	if (listenToPopup) {
// 		alert(JSON.stringify(isPopupOpen));
// 		if (isPopupOpen === false) {
// 			setValueOf_listenToPopup(false);
// 		}
// 	}
// }, [isPopupOpen]);



// export default CreateMeeting;