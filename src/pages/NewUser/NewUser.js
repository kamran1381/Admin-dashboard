import React, { useState  , useContext} from 'react';
import './NewUser.css'
import { Prev } from 'react-bootstrap/esm/PageItem';
import { AppContext } from '../../AppContext';

export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [counter , setcounter] = useState(0)
  const {setFileDataUrl } = useContext(AppContext)
 
   const handleFileChange = (event) =>{
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileDataUrl(URL.createObjectURL(selectedFile));
   }


  function handleSubmit(event) {
    event.preventDefault();

    

    const newUser = {
      id : counter,
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
    setcounter(counter + 1)
  }



  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name ">FullName:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
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
          </div>

          <button type="submit" className='btn btn-primary py-2'>Submit</button>
        </form>
      </div>
    </>
  )
}