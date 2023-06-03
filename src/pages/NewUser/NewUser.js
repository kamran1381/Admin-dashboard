import React, { useState, useContext } from 'react';
import './NewUser.css'
import { AppContext } from '../../AppContext';

export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const { setFileDataUrl  } = useContext(AppContext)
  const [lengthError, setLengthError] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (name.length < 7 || email.length < 7) {
      return;
    }
  
    if (!emailRegex.test(email)) {
      return;
    }

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  
    const newUser = {
      id: newId,
      name,
      email,
      gender,
      file: file ? file.name : '',
    };
  
    setUsers([...users, newUser]);
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
  
    setName('');
    setEmail('');
    setGender('');
    setFile(null);
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > 10485760) {
      setLengthError('File size should not be more than 10MB');
      setFile(null);
      setFileDataUrl('');
      return;
    }
  
    setFile(selectedFile);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFileDataUrl(dataUrl);
    };
    reader.readAsDataURL(selectedFile);
  
    setLengthError('');
  }



  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">FullName:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            {name.length < 7 && name.length > 0 && <span className="error" style={{ color: 'red' }}>Fullname should be more than 7 characters</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {email.length < 7 && email.length > 0 && <span className="error" style={{ color: 'red' }}>Email should be more than 7 characters</span>}
            {!emailRegex.test(email) && email.length >= 7 && <span className="error" style={{ color: 'red' }} >Invalid email format</span>}
          </div>

          <div className="input-group">
            <label htmlFor="gender">Choose your gender:</label>
            <select id="gender" onChange={(event) => setGender(event.target.value)} value={gender} required>
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
              onChange={handleFileChange}
              required
            />
            {lengthError && <span className="error" style={{ color: 'red' }}>{lengthError}</span>}
          </div>

          <button type="submit" className='btn btn-primary py-2'>Submit</button>
        </form>
      </div>
    </>
  )
}






