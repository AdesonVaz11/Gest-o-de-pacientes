import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'

function PacienteDetails() {

    const [paciente, setpaciente] = useState({})
    const { id } = useParams()

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pacientes/${id}`).then((response) => {
            setpaciente(response.data.paciente)
        })
    }, [id])

    async function schedule() {
        const data = await api
            .patch(`/pacientes/schedule/${paciente.id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return err.response.data
            })
        alert(data.message)
    }

    return (
        <div>
            {paciente.name && (
                <section>
                    <div>
                        <h3>Conhecendo o paciente: {paciente.name}</h3>
                        <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                    </div>
                    <div>
                        {paciente.Imagepacientes && paciente.Imagepacientes.length > 0 ? (
                            paciente.Imagepacientes.map((imagepaciente, index) => {
                              
                                return (
                                    <img
                                        key={index}
                                      
                                        alt={paciente.name}
                                    />
                                )
                            })
                        ) : (
                            <p>Não há imagens disponiveis para esse cachorro</p>
                        )}
                    </div>
                    <p>Peso: {paciente.age}anos</p>
                    <p>Idade: {paciente.cpf} cpf</p>
                    {token ? (
                        <button onClick={schedule}>Solicitar uma Visita</button>
                    ) : (
                        <p>
                            Você precisa <Link to='/register'>Criar uma conta</Link> para solicitar a visita
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}

export default PacienteDetails