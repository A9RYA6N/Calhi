import { useNavigate } from "react-router-dom"

const HPHeader = () => {
    const navigate=useNavigate()
  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Calhi</h1>
        <a onClick={()=>navigate('/login')}>Login</a>
        <a onClick={()=>navigate('/register')}>Sign Up</a>
    </header>
  )
}

export default HPHeader
