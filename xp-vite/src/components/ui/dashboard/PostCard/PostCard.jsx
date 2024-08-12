/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { formatDate } from "@/utils/timeFormatter";
import "./PostCard.scss";
import { lazy, Suspense } from "react";
const Custom_Centered_DynamicDialog = lazy(() =>
  import("../../Dialog/Center_Dialog")
);
function showImageByCategory(category) {
  let imageUrl;

  switch (category) {
    case "Promotion":
      imageUrl = "/assets/Card/share.png";
      break;
    case "Message":
      imageUrl = "/assets/Card/message.png";
      break;
    case "Culture":
      imageUrl = "/assets/Card/culture.png";
      break;
    case "Event":
      imageUrl = "/assets/Card/event.png";
      break;
    case "Sales":
      imageUrl = "/assets/Card/ticket.png";
      break;
    default:
      imageUrl = "/assets/Card/network.png";
      break;
  }

  return imageUrl;
}

const PostCard = ({
  data,
  isIconsVisible,
  iconOnLeft = false,
  footer,
  style = {},
}) => {
  const {
    industrySegment,
    insightCategory,
    insightSubCategory,
    iconURL,
    insightDataURL,
    insightLevel,
    insightTitle,
    insightDescription = undefined,
    insightActionItem = undefined,
    actionItemExample,
    createdAt,
    imgUrl = undefined,
  } = data;
  const time = formatDate(createdAt);
  return (
    <div style={style} className="PostCard">
      <div className={iconOnLeft ? "head left" : "head"}>
        <div className="headTitleAndTime">
          <p>{insightSubCategory}</p>
          <time className="time">{time || " Jun 5th 2024 12 22 PM"}</time>
        </div>
        {/* <i className="pi pi-megaphone"></i> */}
        <img
          src={iconURL || "/assets/Card/network.png"}
          height={25}
          width={25}
          loading="lazy"
          alt="insight-Image-category-icon"
        />
      </div>
      <div className="body">
        <h1 className="post_title">{insightTitle}</h1>
        {insightDescription && <p>{insightDescription}</p>}
        <div className="action">
          <div className="action_head">
            <p className="star">Action</p>
            {insightActionItem && <p className="action_title">{insightActionItem}</p>}
          </div>

          <p className="example">
            For example
            <br />
            {actionItemExample && actionItemExample}
          </p>
        </div>
        {data?.imgUrl && (
          <Suspense fallback={<div>Loading...</div>}>
            <Custom_Centered_DynamicDialog label="Preview Image">
              <img
                src={data?.imgUrl || "image_not_found."}
                height={350}
                width={350}
                alt={insightTitle + " insight-image"}
              />
            </Custom_Centered_DynamicDialog>
          </Suspense>
        )}
      </div>
      {footer}
    </div>
  );
};

export default PostCard;

function dummyInsightData() {
  return {
    industrySegment: "Restaurant",
    insightCategory: "Behaviour",
    insightSubCategory: "",
    iconURL: "/pro",
    imgUrl: "/assets/gradient-bg.png",
    insightDataURL: "",
    insightLevel: "",
    insightTitle: "",
    insightDescription: "",
    insightActionItem: "",
    actionItemExample:
      "",
    author: "",
    likes: [],
    dislikes: [],
    comments: [],
    totalBookmarks: 0,
    implementNumber: 0,
  };
}
