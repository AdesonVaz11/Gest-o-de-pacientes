import React, { useContext } from 'react'
import { Link,  } from 'react-router-dom'

//Contexto
import { Context } from '../../context/UserContext'
import './navbar.css'
function NavBar() {
    const { authenticated, logout } = useContext(Context)


        return (
            <nav className='navbar navbar-expand-lg navbar-dark  barraf'>
              <div className='container-fluid'>
                <Link className='navbar-brand'></Link>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                  <ul className='navbar-nav '>
                    <li className='nav-item'>
                      <Link className='nav-link active' aria-current='page' to='/home'>
                        Home
                      </Link>
                    </li>
                    {!authenticated ? (
                      <>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/register'>
                            Registrar
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/'>
                            Login
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/user/profile'>
                            Perfil
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/paciente/create'>
                            Cadastrar pacientes
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/paciente/mypacientes'>
                            Meus pacientes
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link className='nav-link' to='/paciente/myatendimento'>
                            Contato
                          </Link>
                        </li>
                      
                        <li onClick={logout} className='nav-logout'>
                         <button class="Btn align-items: right" >
                          <div class="sign" ><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>  
                           <div class="text">Logout</div>
                        </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          )
          
    
}

export default NavBar


