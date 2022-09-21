import React from "react";
import ProfileComp from "components/user-profile/ProfileComp";
import authGuard from "hooks/authGuard";
import FrontLayout from "layout/FrontLayout";

const ProfilePage = (): JSX.Element => {
  return (
    <FrontLayout>
      <div className="container">
        <div>
          <ProfileComp />
        </div>
      </div>
    </FrontLayout>
  );
};

export default authGuard(ProfilePage);
