
import UserCustomerProfile_DataTable from "./Profile_DataTable"
import "./styles.scss"
import BackButton from "@/components/ui/BackButton"

const User_Management_DashboardPage = () => {
    return (
        <div className='User_Management'>
            <div style={{ margin: "1rem 0" }} className="div">
                <BackButton style={{ margin: " 0" }} href="/dashboard" />
            </div>
            <div className="header">
                <h1>User Management</h1>
                <button className="start p-0">
                    <a style={{ color: "var(--main-Bg)", textDecoration: "none" }} href="/dashboard/User_Management/CreateStaffToken">
                        Add Staff
                    </a>
                </button>
            </div>
            <div className="data-table">
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