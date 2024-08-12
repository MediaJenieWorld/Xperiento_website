import Custom_Centered_DynamicDialog from "@/components/ui/Dialog/Center_Dialog";
// eslint-disable-next-line react/prop-types
const SubscriptionPacksDetails = () => {

  const subscriptionPacks = [
    {
      name: "FREE TRIAL",
      price: "Free for 7 Days",
      description: "Access to basic insights",
      insightLimit: "10 insights per day",
    },
    {
      name: "BRONZE",
      price: "Rs. 250/Month",
      description: "Access to insights with basic features",
      insightLimit: "10 insights per day",
    },
    {
      name: "SILVER",
      price: "Rs. 600/Month",
      description: "Access to insights with advanced features",
      insightLimit: "20 insights per day",
    },
    {
      name: "GOLD",
      price: "Rs. 750/Month",
      description: "Access to premium insights with images",
      insightLimit: "30 insights per day",
    },
  ];

  return (
    <div className="Subscription">
      <h2 style={{ color: "var(--star-color)" }} >Subscription details after free trial of 7 days</h2>{" "}
      <div className="Subscription__container">
        {subscriptionPacks.map((subs, i) => {
          if (i === 0) return
          return (
            <div className={"item"} key={i}>
              <div className="right">
                <h3>{subs.name}</h3>
                <p>{subs.price}</p>

                {/* <i className="pi pi-info-circle"></i> */}
              </div>
              <div className="left">
                <Custom_Centered_DynamicDialog
                  label="info"
                  dialogStyles={{ width: "max-content" }}
                  boxStyles={{ backgroundColor: "rgb(91 90 90 / 80%)", borderRadius: "10px", padding: "1rem", width: "90%", justifyContent: "flex-start" }}
                  LabelChildren={() => <i className="pi pi-info-circle"></i>}
                >
                  <div className="dialog-content">
                    <div className="flex-column">
                      <h4>Subscription Pack Name:</h4>
                      <p style={{ color: "var(--star-color)" }}>{subs.name}</p>
                    </div>
                    <div className="flex-column">
                      <h4>What you can view:</h4>
                      <p style={{ color: "var(--star-color)" }}>{subs.description}</p>
                    </div>
                    <div className="flex-column">
                      <h4>Insight Limit:</h4>
                      <p style={{ color: "var(--star-color)" }}>{subs.insightLimit}</p>
                    </div>
                    <div className="flex-column">
                      <h4>Price:</h4>
                      <p style={{ color: "var(--star-color)" }}>{subs.price}</p>
                    </div>
                  </div>
                </Custom_Centered_DynamicDialog>
              </div>
              {/* <div className="left">
                <i className="pi pi-check"></i>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPacksDetails;
