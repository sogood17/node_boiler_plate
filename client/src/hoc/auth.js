import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props){


    useEffect(()=>{
      dispatch(auth())
        .then(response=>{

          //로그인 하지 않은 상태
          if (!response.payload.isAuth) {
            if (option) {
              navigate('/login')
            }
          }

          //로그인 한 상태
          if (response.payload.isAuth) {
            if (adminRoute && !response.payload.isAdmin) {
              navigate('/')
            } else {
              if (option === false) {
                navigate('/')
              }
            }
            
          }

        })
    }, [])
    return (
      <SpecificComponent />
    )
  }
  return <AuthenticationCheck />
}