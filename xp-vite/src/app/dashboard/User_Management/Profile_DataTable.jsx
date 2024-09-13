import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getUser_Management_Dashboard_Profiles, getFiltered_CustomersProfile } from '@/api/User_Management/api';
import { toast } from 'react-toastify';
import Custom_Centered_DynamicDialog from "@/components/ui/Dialog/Center_Dialog"
import { delete_Staff_Account } from "@/api/Zensight/api";
import { FilterMatchMode } from 'primereact/api';
import { useForm } from 'react-hook-form';


const UserCustomerProfile_DataTable = () => {
  const { getValues, register } = useForm()

  const [deleteActionloading, setdeleteActionLoading] = useState(false)
  const [data, setData] = useState(null)
  const [tableDataLoading, setTableDataLoading] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'email': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'lastName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'phoneNumber': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  async function deleteStaffHandler(id) {
    if (!id || deleteActionloading) return
    try {
      setdeleteActionLoading(true)
      const res = await delete_Staff_Account({ id })
      if (res.data.success) {
        toast.success(res.data.data)
        setData(pre => {
          const oldArr = [...pre]
          const updated = oldArr.filter((val) => val._id !== id)
          return updated
        })
      } else {
        toast.info(res.data.data)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setdeleteActionLoading(false)
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
    setTableDataLoading(false)
  };


  async function getData() {
    try {
      const res = await getUser_Management_Dashboard_Profiles()
      if (res.data.success) {
        const getform = res.data.data
        if (res.data.data.length > 0) {
          setData(getform)
          setTableDataLoading(false)
        }
        else {
          toast.info("Data Not Found")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  if (!data) {
    return <p style={{ color: "var(--primary-color)", textAlign: "center" }}> <i className='pi pi-spin pi-spinner'></i> </p>
  }

  const actionBodyTemplate = (data) => {
    return <>
      {data.role !== "admin" && <div className='actions'>
        <a style={{ textDecoration: "none" }} href={`/dashboard/User_Management/update-staff-profile/${data._id}`}>
          <i style={{ color: "#03A9F4" }} className='pi pi-pen-to-square'></i>
        </a>
        <Custom_Centered_DynamicDialog LabelChildren={() => <i style={{ color: "#F44336" }} className="pi pi-trash"></i>} >
          <div className="model-wrapper">
            <h2 className="wrapper-heading">Confirm Delete Staff</h2>
            <div className="user-details">
              <div className="col">
                <p className="label">First Name</p>
                <p>{data.firstName}</p>
              </div>
              <div className="col">
                <p className="label">Last Name</p>
                <p>{data.lastName}</p>
              </div>
              <div className="col">
                <p className="label">Email</p>
                <p>{data.email}</p>
              </div>
              <div className="col">
                <p className="label">Phone Number</p>
                <p>{data.phoneNumber}</p>
              </div>
            </div>
            <div className="action">
              <button onClick={() => deleteStaffHandler(data._id)} style={{ padding: "6px 20px" }} className="start p-0">{deleteActionloading ? <i className='pi pi-spin pi-spinner'></i> : "Delete"}</button>
            </div>
          </div>
        </Custom_Centered_DynamicDialog>
      </div>}
    </>
  };

  const roleBodyTemplate = (data) => {
    return <div>{data.role.toUpperCase()}</div>;
  };

  const submitFilterHandler = async () => {
    try {
      setTableDataLoading(true)
      const registerValues = getValues()
      const payload = filterPayload(registerValues)
      const res = await getFiltered_CustomersProfile(payload)
      if (res.data.success) {
        const getform = res.data.data
        if (res.data.data.length > 0) {
          toast.success("Data Fetched")
          setData(getform)
        }
        else {
          toast.info("Data Not Found")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
    setTableDataLoading(false)
  }

  const renderHeader = () => {
    return (
      <>
        <h4>Business Profiles</h4>
        <div className="search-box">
          <input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          <button className='loadBtn'>
            <i className={tableDataLoading ? "pi pi-spin pi-spinner" : "pi pi-search"}></i>
          </button>
        </div>
      </>
    );
  };
  const header = renderHeader()

  const rowFilterTemplate = (opt, formField) => {
    return <>
      <input {...register(formField)} style={{ padding: "4px 10px" }} />
      <button className='loadBtn' onClick={() => submitFilterHandler()}>
        <i className={tableDataLoading ? "pi pi-spin pi-spinner" : "pi pi-search"}></i>
      </button>
    </>
  };

  return (
    <>
      <DataTable sortMode="multiple"
        removableSort
        pt={{ paginator: { current: { style: { color: "var(--star-color)" } } } }}
        showGridlines value={data} paginator rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        globalFilterFields={["email", "firstName", "lastName", "phoneNumber"]}
        loading={tableDataLoading}
        header={header}
        filters={filters}
        filterDisplay="row"
        emptyMessage="Profiles not found"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      >
        <Column sortable field={"_id"} header={"Unique Id"} />
        <Column sortable filter filterElement={(options) => rowFilterTemplate(options, "firstName")} field={"firstName"} header={"First Name"} />
        <Column sortable filter filterElement={(options) => rowFilterTemplate(options, "lastName")} field={"lastName"} header={"Last Name"} />
        <Column sortable filter filterElement={(options) => rowFilterTemplate(options, "email")} field={"email"} header={"Email Address"} />
        <Column sortable filter filterElement={(options) => rowFilterTemplate(options, "phoneNumber")} field={"phoneNumber"} header={"Phone Number"} />
        {/* <Column header="Email" filterField="country.name" style={{ minWidth: '12rem' }} field={"email"} filter filterPlaceholder="Search by Email" /> */}
        <Column sortable body={roleBodyTemplate} header={"Role"} />
        <Column sortable body={actionBodyTemplate} header={"Actions"} />
      </DataTable>
    </>
  );
};

function filterPayload(obj) {
  let x = {};
  for (let key in obj) {
    if (obj[key] !== "") {
      x[key] = obj[key];
    }
  }
  return x;
}


export default UserCustomerProfile_DataTable;
