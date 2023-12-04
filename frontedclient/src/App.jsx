import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import { UserProvider } from "./context/UserContext"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PruebaPage from "./pages/PruebaPage"
import ProtectedRoute from "./ProtectedRoute"

function App(){
  return (
    <UserProvider>
      <BrowserRouter>
        <main>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />} >
              <Route path='/prueba' element={<PruebaPage />} />
            </Route>
          </Routes>

        </main>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App