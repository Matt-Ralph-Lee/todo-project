import React from "react";

const Profile = () => {
  return (
    <div className="px-20 flex justify-center pt-20">
      <div className="px-8 py-16 w-full flex items-center flex-col">
        <div className="w-1/2 bg-gray-100 px-4 py-2 flex flex-col items-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <div className="my-4">Username</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
