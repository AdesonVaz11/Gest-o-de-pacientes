import React, { useState } from 'react';
import api from '../../../utils/api';


function AddPacientes() {
  const [paciente, setPaciente] = useState({});
  const [token] = useState(localStorage.getItem('token' || ''));

  function handleChange(e) {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dataToSend = { ...paciente };

    try {
      const response = await api.post('/pacientes/create', dataToSend, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json'
        }
      });
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <section className="form">
      <div className="">
        <h3 className="text-center p-3">Cadastro de Paciente</h3>
        <p className="text-center"></p>
        <form onSubmit={handleSubmit}>
          <div className="inputForm">
            <label>Nome do paciente</label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Digite o nome"
              onChange={handleChange}
            />
          </div>
          <div className="inputForm">
            <label>Idade</label>
            <input
              className="input"
              type="text"
              name="age"
              placeholder="Digite a idade"
              onChange={handleChange}
            />
          </div>
          <div className="inputForm">
            <label>Digite CPF</label>
            <input
              className="input"
              type="text"
              name="cpf"
              placeholder="Digite o CPF"
              onChange={handleChange}
            />
          </div>
          <div className="inputForm">
            <label>Descrição Médica</label>
            <input
              className="input"
              type="text"
              name="description"
              placeholder="Digite a descrição"
              onChange={handleChange}
            />
          </div>
          <div className="inputForm">
            <label>Telefone</label>
            <input
              className="input"
              type="text"
              name="phone"
              placeholder="Digite seu número"
              onChange={handleChange}
            />
          </div>
          <button className="button-submit" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddPacientes;
