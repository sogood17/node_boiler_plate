import { useState } from 'react'
import  axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onNameHandler = (event) => {
    setName(event.target.value)
  }
  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return alert('비밀번호가 같지 않습니다. 다시 한 번 확인해주세요.')
    }

    const body= {
      name,
      email,
      password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/')
        } else {
          alert('Failedm to sign up')
        }
      })

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems : 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler} >
        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler} />
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />
        <button style={{marginTop: '10px'}}>Signup</button>
      </form>
    </div>
  )
}

export default RegisterPage