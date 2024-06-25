import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";

const SignupPage = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });

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
    fetch("http://localhost:3005/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json()) // ожидаем ответ от сервера
      .then((user) => {
        console.log("Ответ сервера: ", user);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных: ", error);
      });
  };
  return (
    <div>
      <h2>Sign up page</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignupPage;
