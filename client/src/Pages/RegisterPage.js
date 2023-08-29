import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import {NavLink }from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let navigate = useNavigate();
  const [username, setuserName] = useState("");
  const [useremail, setuserEmail] = useState("");
  const [userpass, setuserPass] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function ResgisterNewUser(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/users/new-user-sign-up", {
        username,
        useremail,
        userpass,
      })
      .then((res) => {
        if (res.data.message === "exists!") {
          alert("User Email Already Registered!");
        } else {
          alert("Success!");
          navigate("/");
        }
      });
  }

  return (
    <div className="login-container">
      <div className="login-main-div">
        <form className="form" onSubmit={ResgisterNewUser}>
          <p className="form-title">Register</p>
          <div className="input-container">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={useremail}
              onChange={(e) => setuserEmail(e.target.value)}
              required
              type="email"
            />
          </div>
          <div className="input-container">
            <FormControl
              fullWidth
              variant="outlined"
              value={userpass}
              onChange={(e) => setuserPass(e.target.value)}
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Button type="submit" variant="contained" size="large" sx={{ m: 1 }}>
            Register
          </Button>
          <p className="signup-link">
            Already have account?
            <NavLink to="/">
              <a> Sign In</a>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
