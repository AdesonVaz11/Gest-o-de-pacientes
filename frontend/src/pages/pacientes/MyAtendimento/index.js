import React, { useState, useEffect } from 'react'

import api from '../../../utils/api'


function MyAtendimento() {
    const [pacientes, setpacientes] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pacientes/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setpacientes(response.data.pacientes)
        })
    }, [token])

    console.log(pacientes)

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
        <div>
            <div class="text-center"><h2>Ficha Dos Pacientes</h2></div>
            <div className='grid-container'>
                {pacientes.length > 0 &&
                    pacientes.map((paciente) => (
                        <div key={paciente.id}>

                                                     
                            <div class="card text-center">
                                <div class="card-">
                               
                                <h4> {paciente.name}</h4>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title"><p>Ligue para: {paciente.phone}</p></h5>
                                    <h5 class="card-title">CPF: {paciente.cpf}</h5>
                                    <h7 class="card-text">Descricao: {paciente.description} </h7>
                                    <br></br>
                                    <button  onClick={() => { removePaciente(paciente.id) }}
                                            className='btn btn-primary'>Concluido
                                        </button>
                                </div>
                              
                                </div>

                          
                        </div>
                    ))}

                {pacientes.length === 0 && <p>Ainda não há pacientes !!</p>}
            </div>
        </div>
    )
}

export default MyAtendimento