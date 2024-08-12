import "./styles.scss";
import Profile_DataTable from "./Profile_DataTable";

const ClueberryDashboardPage = () => {

    return (
        <>
            <div className="ClueberryDashboardPage">
                <h2>Clueberry</h2>
                <div className="links">
                    <a href="/dashboard/Clueberry/create_profile" className="box">
                        <Arrow />
                        Add New Profile
                    </a>
                    <a href="/dashboard/Clueberry/profile_analytics" className="box">
                        <Arrow />
                        Profile Analytics
                    </a>
                </div>
                <div className="data-table">
                    <div className="table-actions">
                        <h4>Latest Profiles</h4>
                        <div className="actions">
                            <button>Filter</button>
                            <button>Sort By</button>
                        </div>
                    </div>
                    <div className="table">
                        <Profile_DataTable />
                    </div>
                </div>
            </div>
        </>
    );
};

const Arrow = () => {
    return (
        <svg
            width="21"
            height="10"
            viewBox="0 0 21 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 5L20.3536 4.64645L20.7071 5L20.3536 5.35355L20 5ZM1 5.5C0.723858 5.5 0.5 5.27614 0.5 5C0.5 4.72386 0.723858 4.5 1 4.5V5.5ZM16.3536 0.646447L20.3536 4.64645L19.6464 5.35355L15.6464 1.35355L16.3536 0.646447ZM20.3536 5.35355L16.3536 9.35355L15.6464 8.64645L19.6464 4.64645L20.3536 5.35355ZM20 5.5H10.5V4.5H20V5.5ZM10.5 5.5H1V4.5H10.5V5.5Z"
                fill="#fff"
            />
        </svg>
    );
};

export default ClueberryDashboardPage;
