import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined } from "@mui/icons-material";
import { AppContext } from "../../AppContext";
import { Modal } from 'react-bootstrap';

export default function UserList() {
  const [userDatas, setUserDatas] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { fileDataUrls, setFileDataUrl } = useContext(AppContext);
  const [formErrors, setFormErrors] = useState({});
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
    const errors = {};
    if (nameRef.current.value.trim() === "") {
      errors.name = "Name is required";
    }

    if (emailRef.current.value.trim() === "") {
      errors.email = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent further execution if there are errors
    }
    const updatedUserDatas = userDatas.map((user) =>
      user.email === editingUser.email ? {
        ...user,
        name: nameRef.current.value,
        email: emailRef.current.value,
        gender: genderRef.current.value,
        file: fileRef.current.files.length > 0 ? {
          name: fileRef.current.files[0].name,
          type: fileRef.current.files[0].type,
          data: null,
        } : user.file,
      } : user
    );

    setUserDatas(updatedUserDatas);
    localStorage.setItem("users", JSON.stringify(updatedUserDatas));
    if (fileRef.current.files.length > 0) {

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        const updatedUser = updatedUserDatas.find((user) => user.id === editingUser.id);
        updatedUser.file.data = base64;
        setEditingUser(null);

        // Set the new file data URL
        setFileDataUrl((prev) => [
          ...prev.slice(0, updatedUser.id - 1),
          `data:${updatedUser.file.type};base64,${base64}`,
          ...prev.slice(updatedUser.id),
        ]);
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
        const index = params.row.id - 1;
        return params.row.file ? (
          <img src={fileDataUrls[index] || '#'} alt='File' style={{ height: '50px' }} />
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


  return (
    <>
      {userDatas.length === 0 ? <p>No users found</p> : (
        <>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={userDatas}
              columns={columns}
              getRowId={(userDatas) => userDatas.id}
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
                  <input type="text" className={`form-control ${formErrors.name ? 'is-invalid' : ''}`} id="fullname" defaultValue={editingUser?.name} ref={nameRef} />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} id="email" defaultValue={editingUser?.email} ref={emailRef} />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
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

      )}

    </>
  );
}
