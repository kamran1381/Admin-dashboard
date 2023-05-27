import { useState, useEffect, useContext } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function UserList() {
  const [userDatas, setUserDatas] = useState([]);
  const { fileDataUrl } = useContext(AppContext);

  useEffect(() => {
    const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUserDatas(localStorageUsers);
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = userDatas.filter((user) => user.id !== id);
    setUserDatas(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { 
      field: 'file', 
      headerName: 'File',
      width: 200 , 
      renderCell: (params) => {
        return params.row.file ? (
          <img src={fileDataUrl || '#'} alt='File' style={{ height: '50px' }} />
        ) : null;
      }
    },
    {
      field: 'action', 
      headerName: 'Action', 
      width: 200, 
      renderCell: (params) => {
        return (
          <>
            <button className="userEditlist">edit</button>
            <DeleteOutlined
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
              color="error"
            />
          </>
        )
      }
    }
  ];

  if (userDatas.length === 0) {
    return (
      <div>
        <p>No users found</p>
      </div>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={userDatas}
        columns={columns}
        getRowId={(userDatas)=> userDatas.email}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}




