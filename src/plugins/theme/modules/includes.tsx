import { ZTModalContainer, ZTModalContainer_dropdown } from "../styles/CSS";


export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Modal stryle  -->
export const s1 = ZTModalContainer;
// DropDown Style -->
export const s2 = ZTModalContainer_dropdown;

// Determing Endpoint (Node server or php server)
// export const _ext = ".php";
export const _ext = "";

// Duration options -->
export const duration_options = [
    { value: "15", label: '15 minutes' },
    { value: "30", label: '30 minutes' },
    { value: "60", label: '1 hour' },
    { value: "90", label: '1 hour 30 minutes' },
    { value: "120", label: '2 hours' },
    { value: "150", label: '2 hours 30 minutes' },
    { value: "180", label: '3 hours' },
    { value: "210", label: '1 hour 30 minutes' },
];
// Schedule-Meeting-type Icons -->
export const options = [
    { id: 0, hovered: false, icon: require("../../icons/Electricity.png") },
    { id: 1, hovered: false, icon: require("../../icons/GoogleCalendar.png") }
]

// Service Providers -->
export const services = [
    // { id: "default", icon: require("../icons/VideoMessage.png") },
    { id: "zoom", icon: require("../../icons/Zoom-Logo.png") },
    { id: "microsoft teams", icon: require("../../icons/microsoft-teams.png") }
]
// Service Providers in dropdown -->
export const dropdown_services = [
    { value: "zoom", label: 'Zoom' },
    { value: "microsoft teams", label: 'Microsoft Teams' },
];

//return service icon
export function serviceLogo(meetingsHost: string) {
    const serviceLogo = meetingsHost === "zoom" ? require("../../icons/Zoom-Logo.png") :
        meetingsHost === "microsoft teams" ? require("../../icons/microsoft-teams.png") :
            require("../../icons/VideoMessage.png");
    return serviceLogo
}

export const  onHoverScale = {
    RNext: {
        focus: { from: { transform: "scale(1)" }, to: { transform: "scale(1.05)" } },
        blur: { from: { transform: "scale(1.05)" }, to: { transform: "scale(1)" } } 
    }
}
