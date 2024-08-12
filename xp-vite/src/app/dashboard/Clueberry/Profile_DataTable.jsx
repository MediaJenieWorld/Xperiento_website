import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getProfilesData } from '@/api/Clueberry/api';
import { toast } from 'react-toastify';

const Profile_DataTable = () => {
  // const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)


  async function getData() {
    try {
      // setLoading(true)
      const res = await getProfilesData()
      if (res.data.success) {
        const getform = res.data.data
        setData(getform)
      }
    } catch (error) {
      toast.error(error.message)
    }
    // setLoading(false)
  }


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


  return (
    <>
      <DataTable pt={{ paginator: { current: { style: { color: "var(--star-color)" } } } }} showGridlines value={preparedData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      >
        {data.customer_create_profile_form.sections.map(section =>
          section.fields.map(field => (
            <Column key={field.register_key} field={field.label} header={field.label} />
          ))
        )}
      </DataTable>
    </>
  );
};


export default Profile_DataTable;
