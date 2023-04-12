import React from "react";

const WarningIcon = ({
  width = "14px",
  height = "14px",
  color = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7Zm-.55 3h1.1v5.5h-1.1V3ZM7 11.5c-.4 0-.75-.35-.75-.75S6.6 10 7 10s.75.35.75.75-.35.75-.75.75Z"
        fill="#fff"
      />
    </svg>
  );
};

export default WarningIcon;
