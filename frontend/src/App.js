import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import NavBar from "./components/NavBar";
import { UserProvider } from './context/UserContext'
import Container from './components/Container'
import AddPacientes from './pages/pacientes/AddPacientes'
import PacienteDetails from "./pages/pacientes/PacienteDetails";
import MyPacientes from "./pages/pacientes/MyPacientes";
import MyAtendimento from "./pages/pacientes/MyAtendimento";




function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/paciente/create" element={<AddPacientes/>} />
              <Route exact path="/paciente/:id" element={<PacienteDetails />} />
              <Route exact path="/paciente/myatendimento" element={<MyAtendimento />} />
              <Route exact path="/paciente/mypacientes" element={<MyPacientes />} />
            </Routes>
          </Container>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
