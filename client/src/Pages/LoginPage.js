import axios from "axios";
import React, { useState } from "react";
import "./LoginPage.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function formSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/users/log-in", { email, password },{withCredentials: true})
      .then((res) => {
        if (res.data.message === "Successful") {
          navigate("/dashboard")
        } else if (res.data.message === "Password does not match") {
          alert("Password does not match!");
        } else {
          alert("User Not Found!");
        }
      });
  }
  return (
    <div className="login-container">
      <div className="login-main-div">
        <form className="form" onSubmit={formSubmit}>
          <p className="form-title">Log in</p>
          <div className="input-container">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>
          <div className="input-container">
            <FormControl
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Log in
          </Button>
          <p className="signup-link">
            Don't have account?
           <NavLink to="/register"> <a> Create Account</a></NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
