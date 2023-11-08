import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import './Profile.css'

function Profile() {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      alert('Por favor faça o login')
      navigate('/login')
    } else {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, [token, navigate])

  
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    const formData = new FormData()
    
    console.log(JSON.parse(token))
    //adiciona as outras propriedades do usuario ao formData
    await Object.keys(user).forEach((key) => formData.append(key, user[key]))

    const data = await api.patch(`/users/edit/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      alert(err.response.data)
      return err.response.data
    })

    alert(data.message)
  }

  return (
    <div>
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit}>
      <div class="text-center">Atualizar Seu Perfil </div>
        <InputGroup
          type='text'
          label='Nome'
          name='name'
          placeholder='Digite seu nome'
          handleChange={handleChange}
          value={user.name}
        />
        <InputGroup
          type='email'
          label='email'
          name='email'
          placeholder='Digite seu email'
          handleChange={handleChange}
          value={user.email}
        />
        <InputGroup
          type='phone'
          label='phone'
          name='phone'
          placeholder='Digite seu phone'
          handleChange={handleChange}
          value={user.phone}
        />
        <InputGroup
          type='password'
          label='password'
          name='password'
          placeholder='Digite seu password'
          handleChange={handleChange}
        />
        <InputGroup
          type='password'
          label='password'
          name='confirmpassword'
          placeholder='Digite seu password'
          handleChange={handleChange}
        />
        <button type='submit'>Atualizar</button>
      </form>
    </div>
  )
}

export default Profile