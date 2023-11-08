//Login/index.js
import React from 'react'
//hooks
import { useContext, useState } from 'react'
//context
import { Context } from '../../../context/UserContext'

import "./login.css"

function Login() {
  //aqui entra a lógica para o login

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }
  
  return (
    <div class="login">
     
    <div class="title_container">
      <div class="title">Login</div>
      <div class="subtitle">Seja Bem Vindo</div>
    </div>
    <form onSubmit={handleSubmit} class="form">
      <div class="input_container">
        <div>
          <label class="input_label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleChange}
            class="input_field"
          />
        </div>
        <div>
          <label class="input_label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={handleChange}
            class="input_field"
          />
        </div>
      </div>
      <button type="submit" class="sign-in_btn">Login</button>
    </form>
    <p class="note">
      Não tem conta? <a href="/register">Clique aqui!!!</a>
    </p>
  </div>
  



  );
  }
   


 
export default Login