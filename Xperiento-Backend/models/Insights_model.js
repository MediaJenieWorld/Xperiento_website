const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    // industrySegment: {
    //   type: String,
    //   default: "",
    //   required: true,
    // },
    insightCategory: {
      type: String,
      enum: ["Marketing", "Behaviour", "Price", "Complaint", "Sales"],
      required: true,
      default: "Marketing",
    },
    insightSubCategory: {
      type: String,
      default: "",
      required: true,
      // Promotional, Message Opportunity, Higher Ticket Sale
    },
    category_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business_category",
    },
    business_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    iconURL: {
      type: String,
      default: "",
      required: true,
    },
    imgUrl: {
      type: String,
    },
    insightLevel: {
      type: String,
      default: "",
      required: true,
    },
    insightTitle: {
      type: String,
      default: "",
      required: true,
    },
    insightDescription: {
      type: String,
      default: "",
      required: true,
    },
    insightActionItem: {
      type: String,
      default: "",
      required: true,
    },
    actionItemExample: {
      type: String,
      default: "",
      required: true,
    },
    insightActionItem: {
      type: String,
      default: "",
      required: true,
    },
    actionItemExample: {
      type: String,
      default: "",
      required: true,
    },
    age: {
      type: String,
      default: "",
      // required: true,
    },
    race: {
      type: String,
      // enum: [
      //   "American",
      //   "European",
      //   "Asian",
      //   "Hispanic",
      //   "African",
      //   "Alaska Native",
      //   "Latino",
      // ],
      // required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    dislikes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          text: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    bookmarks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    implements: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          stars: {
            type: Number,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
