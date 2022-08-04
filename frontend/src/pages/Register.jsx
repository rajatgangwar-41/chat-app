import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useSignupUserMutation } from '../services/appApi.js'

const Register = () => {

  const navigate = useNavigate();

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [signupUser, {isLoading, error}] = useSignupUserMutation();

  const[image, setImage] = useState(null);
  const[uploadingImage, setUploadingImage] = useState(false);
  const[imagePreview, setImagePreview] = useState(false);

  function validateImage(e) {
    const file = e.target.files[0];
    if(file.size >= 1048576) {
      return alert("Max Size for Images is 1MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Your Folder");
    try {
        setUploadingImage(true);
        let res = await fetch("https://api.cloudinary.com/v1_1/YOUR USERNAME/image/upload", {
            method: "post",
            body: data,
        });
        const urlData = await res.json();
        setUploadingImage(false);
        return urlData.url;
    } catch (error) {
        setUploadingImage(false);
        console.log(error);
    }
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    if(!image) {
      return alert("Please upload your profile image");
    }
    const url = await uploadImage(image);
    console.log(url);
    //register user
    signupUser({name, email, password, image: url}).then(({data}) => {
      if(data) {
        console.log(data);
        navigate("/login");
      }
    })
  };

  return (
    <div className='login-container'>
      <div className="login-row">
        <div className="login-col">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="image">
              <img src={imagePreview || './assets/images/user.png'} alt="" />
              <label htmlFor="image_upload">
                <FontAwesomeIcon icon={faPlusCircle} />
              </label>
              <input type="file" id='image_upload' hidden accept='image/png, image/jpeg' onChange={validateImage} />
            </div>
            <div className="form-groups">
              <label htmlFor="name">Name</label>
              <input type="name" id='name' autoComplete='off' onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
            <div className="form-groups">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div className="form-groups">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' autoComplete='off' onChange={(e) => setPassword(e.target.value)} value={password} required/>
            </div>
            <div className="form-groups button">
              <button>{uploadingImage ? "Registration in progress..." : "Register"}</button>
            </div>
            <div className="form-groups">
              <p>You have an Account? <Link to="/login"> Login</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
