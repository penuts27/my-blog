import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe } from '../../WebAPI'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../context'

const ErrorMessage = styled.div`
    color: red;   
`;

export default function LoginPage() {
    const [userNameValue, setUserNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [postErr,setPostErr] = useState('')
    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext) 

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('@@',setUser('123'))
        setPostErr('')
        login(userNameValue,passwordValue)
        .then(data => {
            console.log(data)
            if(data.ok === 0){
                // 錯誤則return
                return setPostErr(data.message)
            }
            setAuthToken(data.token)
            getMe().then(res =>{
                console.log(res)
                if(res.ok !== 1) {
                    // 清空token(有拿到token但驗證未過，回頭清空token)
                    setAuthToken(null)
                    return setPostErr(res.toString())
                }
                setUser(res.data)
                navigate('/')
            })
            .catch(err=>console.log(err))
        })
        .catch(err =>console.log(err.message))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                username: <input type='text' value={userNameValue} onChange={e=> setUserNameValue(e.target.value)}/>
            </div>
            <div>
                password: <input type='password' value={passwordValue} onChange={e=> setPasswordValue(e.target.value)}/>
            </div>
            {postErr && <ErrorMessage>{postErr}</ErrorMessage>}
            <button>送出</button>
        </form>
    )
} 