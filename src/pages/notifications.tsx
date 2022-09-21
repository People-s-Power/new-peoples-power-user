import React from 'react';
import FrontLayout from "layout/FrontLayout";
import NotificationComp from 'components/NotificationComp';

const notifications = () => {
    return (
        <FrontLayout>
            <div className="mx-32">
                <div className="p-3 pl-8 border-b border-gray-200 text-lg">Notifications</div>
                <div>
                    <NotificationComp />
                </div>
            </div>
        </FrontLayout>
    );
};

export default notifications;