import {  Routes,Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import PrivateRoutes from "./routes/PrivateRoutes"
function App() {

  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path="/" element={<HomePage/>} exact/>
        <Route path="/me" element={<ProfilePage/>}/>


      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegistrationPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>




    </Routes>
    </>
  )
}

export default App
