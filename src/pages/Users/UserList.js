import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from "@mui/icons-material";
import { AppContext } from "../../AppContext";
import { Modal } from 'react-bootstrap';

export default function UserList() {
  const [userDatas, setUserDatas] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { fileDataUrl , setFileDataUrl} = useContext(AppContext);
  useEffect(() => {
    const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUserDatas(localStorageUsers);
  }, []);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const fileRef = useRef(null);
  const handleDelete = (id) => {
    const updatedUsers = userDatas.filter((user) => user.id !== id);
    setUserDatas(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSave = () => {
    const updatedUserDatas = userDatas.map((user) =>
      user.email === editingUser.email ? {
        ...user,
        name: nameRef.current.value,
        email: emailRef.current.value,
        gender: genderRef.current.value,
        file: fileRef.current.files.length > 0 ? {
          name: fileRef.current.files[0].name,
          type: fileRef.current.files[0].type,
          data: null // We'll populate this below
        } : user.file,
      } : user
    );

    setUserDatas(updatedUserDatas);
    localStorage.setItem("users", JSON.stringify(updatedUserDatas));

    // Convert file data to Base64 and update the user object
    if (fileRef.current.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        const updatedUser = updatedUserDatas.find((user) => user.email === editingUser.email);
        updatedUser.file.data = base64;
        setUserDatas(updatedUserDatas);
        localStorage.setItem("users", JSON.stringify(updatedUserDatas));
        setEditingUser(null);

        setFileDataUrl(`data:${updatedUser.file.type};base64,${base64}`);
      };
      reader.readAsDataURL(fileRef.current.files[0]);
    } else {
      setEditingUser(null);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    {
      field: 'file',
      headerName: 'File',
      width: 200,
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
            <button className="userEditlist" onClick={() => setEditingUser(params.row)}>edit</button>
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
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={userDatas}
          columns={columns}
          getRowId={(userDatas)=> userDatas.id}
          pageSize={5}
          disableSelectionOnClick
        />
      </div>

      <Modal show={editingUser !== null} onHide={() => setEditingUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" className="form-control" id="fullname" defaultValue={editingUser?.name} ref={nameRef} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" defaultValue={editingUser?.email} ref={emailRef} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select className="form-control" id="gender" defaultValue={editingUser?.gender} ref={genderRef}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="file">File</label>
              <input type="file" className="form-control-file" id="file" ref={fileRef} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setEditingUser(null)}>
            Close
          </button>
          <button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
