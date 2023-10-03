import {useState,useEffect} from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { buttonText } from '../../../_actions/text_action';

function LandingPage() {
  const dispatch =useDispatch();
  

  useEffect(()=>{
    axios.get("/api/hello")
    .then(response => console.log(response.data))
  }, [])

  const onClickHandler =() => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          setButtonText('로그인')
        }
      })
  }

  dispatch(buttonText(text)) 

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><h2>랜딩페이지</h2></div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><button style={{backgroundColor:'pink', border: 'none'}} onClick={onClickHandler}>{buttonText}</button></div>
    </div>
  )
}

export default LandingPage