import React, { useState } from 'react';
import "./Register.css";
import user_icon from "../assets/person.png"
import Header from '../Header/Header';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      sessionStorage.setItem('firstname', firstName);
      sessionStorage.setItem('lastname', lastName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user is already registered.")
    } else {
      alert("Registration failed.")
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container" style={{ width: "50%", margin: "5% auto", padding: "20px", borderRadius: "10px" }}>
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="text" style={{ fontSize: "36px", fontWeight: "bold" }}>SignUp</span>
          <img src={user_icon} className="img_icon" alt='user_icon' style={{ width: "50px", height: "50px" }} />
          <hr />
        </div>

        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="input">
              <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="input">
              <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="input">
              <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input">
              <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="submit_panel">
            <input className="submit" type="submit" value="Register" />
            <input className="submit" type="button" value="Cancel" onClick={gohome} style={{ marginTop: "10px" }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
