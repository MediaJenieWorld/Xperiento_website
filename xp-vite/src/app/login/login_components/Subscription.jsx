import InfoRender from "@/app/dashboard/Subscription/InfoRender";
import Custom_Centered_DynamicDialog from "@/components/ui/Dialog/Center_Dialog";
import { subscriptionPacks } from "@/utils/SubPacks";
// eslint-disable-next-line react/prop-types
const SubscriptionPacksDetails = () => {

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
                  boxStyles={{
                    maxWidth: "600px",
                    backgroundColor: "rgb(91 90 90 / 80%)",
                    borderRadius: "10px", padding: "1rem", width: "90%",
                    justifyContent: "flex-start"
                  }}
                  LabelChildren={() => <i className="pi pi-info-circle"></i>}
                >
                  <div className="dialog-content">
                    <InfoRender subs={subs} />
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
