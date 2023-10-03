import { useState } from 'react'
import  axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()

    const body= {
      email,
      password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('Error')
        }
      })

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems : 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler} >
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <button style={{marginTop: '10px'}}>Login</button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);