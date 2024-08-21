import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FeedRightSectionColumns = ({
  rank,
  name,
  accuracy,
  imgUrl,
  userId,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${className} right-columns`}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
      }}
    >
      <div
        className="card-img"
        style={{
          borderRadius: "50%",
          border: "1px solid #ffffff80",
          padding: "2px",
          height: "48px",
          width: "48px",
        }}
      >
        <Image
          src={imgUrl}
          alt="N/A"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/dashboard/Leaderboards/${userId}`)}
        />
      </div>
      <div
        className="profile-name"
        style={{
          paddingLeft: "10px",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5
          className="cursor-pointer text-[#ffffff] font-semibold text-base hover:underline"
          onClick={() => navigate(`/dashboard/Leaderboards/${userId}`)}
        >
          <span className="!text-[#ffffff80]">#{rank}</span> {name}
        </h5>
        <h6 className="text-xs text-[#ffffff80]">
          Accuracy{" "}
          <span
            style={{
              color: accuracy > 35 ? "#009A7C" : "#ff4242",
            }}
          >
            {Math.floor(accuracy)}%
          </span>
        </h6>
      </div>
    </div>
  );
};

export default FeedRightSectionColumns;
