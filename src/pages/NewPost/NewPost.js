import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe } from '../../WebAPI'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { setAuthToken } from '../../utils'
import { AuthContext,ArticleData } from '../../context'
import { postApi,getPost } from '../../WebAPI';

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
    color: red; 
    margin-bottom: 8px;  
`;
const Input = styled.input.attrs(props=>({
    type: 'text',
    size: props.soze || '16px'
    }))`
    width: 600px;
    border: 1px solid #444;
    border-radius: 2px;
    padding: 8px;
`;
const TextArea = styled(Input)``;

const NewPostForm = styled.form`
    max-width: 980px;
    margin: 0 auto;
    margin-top: 20px;
`;
const FormGroup = styled.div`
    margin-bottom: 8px;
`;


const Label = styled.div`
    margin-bottom: 8px;
`;

export default function NewPost({setPostData}) {
    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const [postErr,setPostErr] = useState('')
    const [isLoadingPostData,setIsLoadingPostData] = useState(false)
    const navigate = useNavigate()
    const {setPosts} = useContext(ArticleData) 
    
    const handleSubmit = (e) => {
        e.preventDefault()
         // 若正在loading則不執行
        if(isLoadingPostData) return
        // 若標題欄未填則不執行
        if(!titleValue) return setPostErr('something went wrong.title is required!')
        // 若內文欄未填則不執行
        if(!contentValue) return setPostErr('something went wrong.content is required!')
        setPostErr('')
        setIsLoadingPostData(true)
        postApi(titleValue,contentValue).then(data=>{
            if(data.ok === 0){
                setIsLoadingPostData(false)
                return setPostErr(data.message)
            }
            getPost()
            .then(data => {
                setPosts(data)
            })
            setIsLoadingPostData(false)
            navigate('/')
        })
        .catch(err => {
            setIsLoadingPostData(false)
            setPostErr(err.message)
        })
   
    }
    return (
        <NewPostForm onSubmit={handleSubmit}>
            {isLoadingPostData && <Loading>Loading...</Loading>}
            <FormGroup>
                <Label>標題:</Label> 
                <Input placeholder="請輸入標題" size="1rem" value={titleValue} onChange={e=> setTitleValue(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
            <Label>內文:</Label> 
            <TextArea as='textarea' placeholder="請輸入內文" rows={10} value={contentValue} onChange={e=> setContentValue(e.target.value)}>123</TextArea>
            </FormGroup>
            {postErr && <ErrorMessage>{postErr}</ErrorMessage>}
            <button>送出</button>
        </NewPostForm>
    )
} 