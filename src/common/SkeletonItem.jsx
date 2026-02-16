import React from "react";

const SkeletonItem = () => {
  return (
    <li className="list-row">
      <div className="flex items-center gap-4 w-full">
        <div className="skeleton w-10 h-10 rounded-full"></div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="skeleton h-3 w-32"></div>
          <div className="skeleton h-2 w-48"></div>
        </div>
      </div>
    </li>
  );
};

export default SkeletonItem;
