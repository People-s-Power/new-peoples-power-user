import ShareModal from 'components/modals/ShareModal';
import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { ICampaign } from "types/Applicant.types";
import { BASEURL } from "utils/constants";


export const CampaignShareMenuList = ({
  camp,
  children,
  orgs,
  ...props
}: {
  camp: ICampaign;
  children: React.ReactChild;
  orgs?: any;
}): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown">
      <span data-bs-toggle="dropdown" {...props}>
        {children}
      </span>
      <ul className="dropdown-menu m-0 ">
        <li className="dropdown-menu-item mb-2 ">
          <FacebookShareButton url={`${BASEURL}/${camp.__typename}?page=${camp?._id}`}>
            <button className="btn py-0 ">
              <i className="fab fa-facebook-f text-facebook me-2"></i>
              Facebook
            </button>
          </FacebookShareButton>
        </li>
        <li className="dropdown-menu-item mb-2 ">
          <TwitterShareButton url={`${BASEURL}/${camp.__typename}?page=${camp?._id}`}>
            <button className="btn py-0 ">
              <i className="fab fa-twitter text-twitter me-2"></i> Twitter
            </button>
          </TwitterShareButton>
        </li>
        <li className="dropdown-menu-item mb-2 ">
          <WhatsappShareButton url={`${BASEURL}/${camp.__typename}?page=${camp?._id}`}>
            <button className="btn py-0 ">
              <i className="fab fa-whatsapp text-whatsapp me-2 "></i>
              Whatsapp
            </button>
          </WhatsappShareButton>
        </li>
        <li>
          <button onClick={() => setOpen(!open)}>
            Timeline
          </button>
        </li>
      </ul>
      <ShareModal open={open} handelClick={() => setOpen(!open)} single={camp} orgs={orgs} />
    </div>
  );
};

