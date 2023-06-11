

import React, { useState, useContext } from 'react';
import './NewUser.css'
import { AppContext } from '../../AppContext';

export default function NewUser() {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    gender: '',
    file: null,
  });

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  const { setFileDataUrl } = useContext(AppContext);
  const [lengthError, setLengthError] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const newValue = name === 'file' ? files[0] : value;

    setInputValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValues.name.length < 7 || inputValues.email.length < 7) {
      return;
    }

    if (!emailRegex.test(inputValues.email)) {
      return;
    }

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      name: inputValues.name,
      email: inputValues.email,
      gender: inputValues.gender,
      file: inputValues.file ? inputValues.file.name : '',
    };

    setUsers([...users, newUser]);

    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    setInputValues({
      name: '',
      email: '',
      gender: '',
      file: null,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > 10485760) {
      setLengthError('File size should not be more than 10MB');
      setInputValues((prevState) => ({
        ...prevState,
        file: null,
      }));
      setFileDataUrl('');
      return;
    }

    setInputValues((prevState) => ({
      ...prevState,
      file: selectedFile,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFileDataUrl(dataUrl);
    };
    reader.readAsDataURL(selectedFile);

    setLengthError('');
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">FullName:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              required
            />
            {inputValues.name.length < 7 && inputValues.name.length > 0 && (
              <span className="error" style={{ color: 'red' }}>
                Fullname should be more than 7 characters
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              required
            />
            {inputValues.email.length < 7 && inputValues.email.length > 0 && (
              <span className="error" style={{ color: 'red' }}>
                Email should be more than 7 characters
              </span>
            )}
            {!emailRegex.test(inputValues.email) &&
              inputValues.email.length >= 7 && (
              <span className="error" style={{ color: 'red' }}>
                Invalid email format
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="gender">Choose your gender:</label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={inputValues.gender}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="file">Upload a file:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
            />
            {lengthError && (
              <span className="error" style={{ color :'red' }}>
{lengthError}
</span>
)}
</div>

      <button type="submit" className="btn btn-primary py-2">
        Submit
      </button>
    </form>
  </div>
</>
);
}

