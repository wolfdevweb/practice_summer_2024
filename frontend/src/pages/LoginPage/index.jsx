import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(user);
  };
  //функция для отправки данных пользователя на сервер
  const sendData = (user) => {
    // Используем fetch для отправки POST-запроса на сервер
    fetch("http://localhost:3005/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json()) // ожидаем ответ от сервера
      .then((data) => {
        // console.log("Ответ сервера: ", token);
        dispatch(login(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        navigate('/');
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных: ", error);
      });
  };
  return (
    <div className="loginpage">
      <h2>Log in Page</h2>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic1"
          name="username"
          value={user.username}
          onChange={handleChange}
          label="username"
          variant="outlined"
        />
        <TextField
          id="outlined-basic2"
          name="password"
          value={user.password}
          onChange={handleChange}
          label="password"
          variant="outlined"
        />
        <button type="submit">Submit</button>
      </form>
      <Link to={'/signup'} className="signupbutton">Sign up</Link>
    </div>
  );
};

export default LoginPage;
