import "./login.css";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useState, useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function Login({ updateAuthStatus }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const loginUserHandler = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const userData = {
      userName: userRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Either userName or Password is Wrong");
        }
        return response.json();
      })
      .then((data) => {
        // Extract the data from the parsed JSON response
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { userName: data.userName },
        });
        // console.log(data);
        // Store the tokens and other data in session storage
        sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
        sessionStorage.setItem("refreshToken", `Bearer ${refreshToken}`);
        // sessionStorage.setItem("user,")
        /*Storing userName and name globally using  contextAPI*/
        // setUser(userName);
        // isUserAuthenticated(true);
        /*navigating to the home page */
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "LOGIN_FAILURE" });
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "login Failed";
        setAlertDetails(alert);
        setOpenAlert(true);
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>UserName</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          // onChange={userNameChangeHandler}
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          // onChange={passwordChangeHandler}
          ref={passwordRef}
        />
        <button className="loginButton" onClick={loginUserHandler}>
          Login
        </button>
      </form>
      <Link to={"/register"}>
        <button className="loginRegisterButton">Register</button>
      </Link>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertDetails.severity}
          onClose={handleClose}
          variant="filled"
          elevation={6}
        >
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
