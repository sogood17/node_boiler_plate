import {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LandingPage() {
  const navigate = useNavigate();
  

  useEffect(()=>{
    axios.get("/api/hello")
    .then(response => console.log(response.data))
  }, [])
  
  const onClickHandler = () => {
    axios.get("/api/users/logout")
    .then(response => {
      if (response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃 하는 데 실패하였습니다.')
      }
    })
  }

  return (
    <div>
      <h2>랜딩페이지</h2>
      <button onClick={onClickHandler}>logout</button>
    </div>
  )
}

export default Auth(LandingPage, null);