
import UserCustomerProfile_DataTable from "./Profile_DataTable"
import "./styles.scss"

const User_Management_DashboardPage = () => {
    return (
        <div className='User_Management'>
            <div className="header">
                <h1>User Management</h1>
                <button className="start p-0">
                    <a style={{ color: "var(--main-Bg)", textDecoration: "none" }} href="/dashboard/User_Management/CreateStaffToken">
                        Add Staff
                    </a>
                </button>
            </div>
            <div className="data-table">
                <div className="table-actions">
                    <h4>Staff Profiles</h4>
                    <div className="actions">
                        <button>Filter</button>
                        <button>Sort By</button>
                    </div>
                </div>
                <div className="table">
                    <UserCustomerProfile_DataTable />
                </div>
            </div>
            <div className="form">
            </div>
        </div>
    )
}

export default User_Management_DashboardPage