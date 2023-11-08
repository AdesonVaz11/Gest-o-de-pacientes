import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'

function MyPacientes() {
  const [pacientes, setpacientes] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/pacientes/mypacientes', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setpacientes(response.data.pacientes)
    })
  }, [token])

  async function removePaciente(id) {
    const data = await api.delete(`/pacientes/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== id)
      setpacientes(updatedPacientes)
      return response.data
    }).catch((err) => {
      return err.response.data
    })

    alert(data.message)
  }


  return (
    <section>
      <div >
        <h1>meus pacientes</h1>
        <p>Veja os detalhes de cada um e conheça seu caso </p>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>nome</th>
            <th>prescricao medica</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.name}</td>

                <td>{paciente.description}</td>
                <td>
                  <Link to='/paciente/myatendimento' className='btn btn-success'>Em andamento</Link>
                  <button onClick={() => { removePaciente(paciente.id) }}
                    className='btn btn-danger'>Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>Não há pacientes cadastrados ou disponíveis no momento</tr>
          )}
        </tbody>
      </table>

    </section>
  )





}

export default MyPacientes