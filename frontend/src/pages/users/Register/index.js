//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'
import "./Register.css"
//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento){
    evento.preventDefault()
    register(user)
  }
  return (
    <div>
    
    <div>
      <form onSubmit={handleSubmit} className="form">
              <div class="title">Registro</div>
        <div>
        <InputGroup className="form_container"
          type='text'
          label='Digite seu nome'
          placeholder='Seu nome aqui'
          name='name'
          handleChange={handleChange}
        />
        <InputGroup
          type='email'
          label='Digite seu email'
          placeholder='Seu email aqui'
          name='email'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite seu crm'
          placeholder='Seu crm aqui'
          name='crm'
          handleChange={handleChange}
        />
        <InputGroup
          type='tel'
          label='Digite seu telefone aqui'
          placeholder='Seu telefone aqui'
          name='phone'
          handleChange={handleChange}
        />
        <InputGroup
          type='password'
          label='Digite sua senha'
          placeholder='Digite sua senha'
          name='password'
          handleChange={handleChange}
        />
        <InputGroup
          type='password'
          label='Confirme sua senha'
          placeholder='Confirme sua senha'
          name='confirmpassword'
          handleChange={handleChange}
        />
        </div>
        <select name='profissao' onChange={handleChange} className="btn">
          <option value=''>Escolha sua profissão</option>
          <option value={0}>Médico</option>
          <option value={1}>Secretaria</option>
        </select>
        <button type='submit' className="button-submit">Registrar</button>
      </form>     
    </div>
  </div>
)
}
export default Register