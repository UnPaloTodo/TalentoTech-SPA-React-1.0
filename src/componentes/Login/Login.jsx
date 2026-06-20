import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexto/AuthContexto"
import "./Login.css"


export const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

    try {
        await login(formData.email, formData.password)
        console.log("Login exitoso")
        navigate("/admin", { replace: true })
    } catch (error) {
        console.error (error)
        alert("Error al iniciar sesión")
    }}

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar Sesión</h2>

            <div className="form-group">
                <label> Correo Electrónico </label>
                <input type="email" name="email" 
                placeholder="ejemplo@ejemplo.com" 
                value={formData.email} 
                onChange={handleChange} />
            </div>

            <div className="form-group">
                <label> Contraseña</label>
                <input type="password" name="password" 
                placeholder="******"
                value={formData.password} 
                onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
            </form> 
    ) 
}