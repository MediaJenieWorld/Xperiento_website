import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getProfilesData, getFiltered_VisitorsProfile } from '@/api/Clueberry/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FilterMatchMode } from 'primereact/api';

const Profile_DataTable = () => {
  const { getValues, register } = useForm()
  const [data, setData] = useState(null)
  const [tableDataLoading, setTableDataLoading] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'full_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'age_group': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // 'lastName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // 'phoneNumber': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  async function getData() {
    try {
      setTableDataLoading(true)
      const res = await getProfilesData()
      if (res.data.success) {
        const getform = res.data.data
        setData(getform)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setTableDataLoading(false)
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
    setTableDataLoading(false)
  };

  useEffect(() => {
    getData()
  }, [])

  if (!data) {
    return <p style={{ color: "var(--primary-color)", textAlign: "center" }}> <i className='pi pi-spin pi-spinner'></i> </p>
  }


  // Prepare the data for the DataTable
  const preparedData = data.profiles.map(profile => {
    const rowData = { id: profile._id }; // Add an ID for the row
    data.customer_create_profile_form.sections.forEach(section => {
      section.fields.forEach(field => {
        rowData[field.label] = profile.data[field.register_key] || "N/A";
      });
    });
    return rowData;
  });



  const renderHeader = () => {
    return (
      <>
        <h4>Business Profiles</h4>
        <div className="search-box">
          <input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          <i className='pi pi-search'></i>
        </div>
      </>
    );
  };
  const header = renderHeader()

  const submitFilterHandler = async () => {
    try {
      const registerValues = getValues()
      const payload = filterPayload(registerValues)
      const res = await getFiltered_VisitorsProfile(payload)
      if (res.data.success) {
        const getform = res.data.data
        if (getform.length > 0) {
          setData(pre => {
            const x = { ...pre }
            return { ...x, profiles: getform }
          }
          )
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

  const rowFilterTemplate = (opt, formField) => {
    return <>
      <input {...register(formField)} style={{ padding: "4px 10px" }} />
      <i onClick={() => submitFilterHandler()} className="pi pi-search"></i>
    </>
  };

  return (
    <>
      <DataTable header={header}
        sortMode="multiple"
        removableSort
        globalFilterFields={["full_name", "age_group"]}
        filters={filters}
        loading={tableDataLoading}
        filterDisplay="row"
        emptyMessage="Visitor's Profiles not found"
        pt={{ paginator: { current: { style: { color: "var(--star-color)" } } } }}
        showGridlines value={preparedData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      >
        {data.customer_create_profile_form.sections.map(section =>
          section.fields.map(field => (
            <Column
              sortable filter filterElement={(options) => rowFilterTemplate(options, field.register_key)}
              key={field.register_key} field={field.label} header={field.label} />
          ))
        )}
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

export default Profile_DataTable;
