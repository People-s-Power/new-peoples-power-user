import { atom } from "recoil";
import { IUser } from "types/Applicant.types";

export const orgDataState = atom({
    key: 'OrgData',
    default: null as unknown as Partial<IUser>,
  });