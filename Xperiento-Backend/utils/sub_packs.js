const subscriptionPacks = [
  {
    name: "FREE TRIAL",
    price: 0,
    days: 7,
    availableFields: "insightDescription",
    notAvailableFields: "-imgUrl -actionItemExample",
  },
  {
    name: "BRONZE",
    price: 250,
    days: 30,
    availableFields: "insightDescription -imgUrl actionItemExample",
    notAvailableFields: "-imgUrl -actionItemExample",
  },
  {
    name: "SILVER",
    price: 600,
    days: 30,
    availableFields: "insightDescription imgUrl actionItemExample",
    notAvailableFields: "-imgUrl",
  },
  {
    name: "GOLD",
    price: 750,
    days: 30,
    availableFields: "insightDescription imgUrl actionItemExample",
    notAvailableFields: "",
  },
];
module.exports = {
  subscriptionPacks,
};
