import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe } from '../../WebAPI'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../context'

const Loading = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #999;
    opacity: .8;
    color: #fff;
    font-size: 28px;
`;
const ErrorMessage = styled.div`
    margin-bottom: 8px;  
    color: red;   
`;

const Label = styled.div`
    margin-bottom: 8px;
`;
const Input = styled.input.attrs(props=>({
    type: 'text',
    size: props.soze || '16px'
    }))`
    width: 300px;
    border: 1px solid #444;
    border-radius: 2px;
    padding: 8px;
`;
const PasswordInput = styled(Input).attrs({
    type: "password"
})``;
const LoginForm = styled.form`
    max-width: 980px;
    margin: 0 auto;
    margin-top: 20px;
`;
const FormGroup = styled.div`
    margin-bottom: 10px;
`;

export default function LoginPage() {
    const [userNameValue, setUserNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [postErr,setPostErr] = useState('')
    const [isLoadingLogin,setIsLoadingLogin] = useState(false)
    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext) 

    const handleSubmit = (e) => {
        e.preventDefault()
        // 若正在loading則不執行
        if(isLoadingLogin) return
        // 若姓名欄未填則不執行
        if(!userNameValue) return setPostErr('something went wrong.username is required!')
        // 若密碼欄未填則不執行
        if(!passwordValue) return setPostErr('something went wrong.password is required!')
        // 再次送出表單取消alert
        setPostErr('')
        // 發api之前更改狀態
        setIsLoadingLogin(true)
        login(userNameValue,passwordValue)
        .then(data => {
            console.log(data)
            if(data.ok === 0){
                // 離開func之前更改狀態
                setIsLoadingLogin(false)
                // 錯誤則return
                return setPostErr(data.message)
            }
            // 若成功則儲存localStorage
            setAuthToken(data.token)
            // 執行驗證api(/me)
            getMe().then(res =>{
                console.log(res)
                if(res.ok !== 1) {
                    // 離開func之前更改狀態
                    setIsLoadingLogin(false)
                    // 未驗證成功，清空token(有拿到token但驗證未過，回頭清空token)
                    setAuthToken(null)
                    return setPostErr(res.toString())
                }
                // 驗證成功，上傳使用者資料至app.js
                setUser(res.data)
                navigate('/')
            })
            .catch(err=>{
                setIsLoadingLogin(false)
                setPostErr(err.message)
            })
        })
        .catch(err =>{
            setIsLoadingLogin(false)
            setPostErr(err.message)
        })
    }
    return (
        <LoginForm onSubmit={handleSubmit}>
            {isLoadingLogin && <Loading>Loading...</Loading>}
            <FormGroup>
                <Label>username:</Label> 
                <Input placeholder="請輸入使用者名稱" value={userNameValue} onChange={e=> setUserNameValue(e.target.value)}/>
            </FormGroup>
            <FormGroup>
            <Label>password:</Label> 
            <PasswordInput placeholder="請輸入密碼" value={passwordValue} onChange={e=> setPasswordValue(e.target.value)}/>
            </FormGroup>
            {postErr && <ErrorMessage>{postErr}</ErrorMessage>}
            <button>送出</button>
        </LoginForm>
    )
} 