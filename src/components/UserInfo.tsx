import React from "react";

export const UserInfo: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold">Name: Durgaprasad Dalai</span>
        <span className="text-xs text-gray-600">
          Email: durgaprasaddalai10@gmail.com
        </span>
      </div>
    </div>
  );
};