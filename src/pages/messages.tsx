import React from 'react';
import FrontLayout from "layout/FrontLayout";

const messages = () => {
    return (
        <FrontLayout showFooter={false}>
            <div className="flex px-32">
                <div className="w-[40%]">
                    <div className="text-lg p-3">Messages</div>
                    <div className="flex p-3 hover:bg-gray-100">
                        <div className="p-2 bg-gray-400 rounded-full">
                            <img src="/images/home/icons/icons8_advertising.svg" alt="" />
                        </div>
                        <div className="w-2/3 text-sm ml-4">You created an advert for “future young
                            readers” </div>
                        <div className="w-20 text-xs ml-auto">7 sep 2022</div>
                    </div>
                </div>
                <div className="w-[40%] shadow-sm fixed right-32 h-full">
                    <div className="p-2 text-center text-xs text-gray-400 border-b border-gray-200">Fri 7 sep 2022</div>
                    <div className="p-3 border-b border-warning">
                        <div className="flex mb-3">
                            <img src="/images/person.png" className="w-12 h-12 rounded-full" alt="" />
                            <div className="ml-4 my-auto">
                                <div className="text-sm">Peoples Power</div>
                                <div className="text-xs"> 3:42 PM</div>
                            </div>
                        </div>
                        <div className="text-xs my-2">
                            Hi Emmanuel,
                        </div>
                        <div className="text-xs my-2">
                            On 7 sep 2022, you created an advert for future young readers
                            for a deep dive into identifying and creating adverts Mark your
                            calendars: oct 7 2022 as Evelyn Duley
                        </div>
                        <div className="text-xs my-2">
                            On 7 sep 2022, you created an advert for future young readers
                            for a deep dive into identifying and creating adverts Mark your
                            calendars: oct 7 2022 as Evelyn Duley
                        </div>
                    </div>
                    <div>
                        <textarea name="" id="" className="w-full h-32 text-sm p-2 border border-white" placeholder="Write a message"></textarea>
                        <div className="flex justify-between border-t border-gray-200 p-3">
                            <div className="flex w-20 justify-between">
                                <img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
                                <img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/charm_camera-video.svg" alt="" />
                                <img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/bi_file-earmark-arrow-down.svg" alt="" />
                            </div>
                            <div className="text-sm text-warning cursor-pointer">Send</div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
};

export default messages;