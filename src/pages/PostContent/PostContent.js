import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe, putPost } from '../../WebAPI'
import styled from 'styled-components'
import { useNavigate,useParams } from "react-router-dom";
import { setAuthToken } from '../../utils'
import { ArticleData } from '../../context'
import { deletePost,getPost } from '../../WebAPI'

const PostContainer = styled.div`
      text-align: center;
      max-width: 980px;
      margin: 0 auto;
`;
const inputGroup = styled.div``;

const Title =styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
    line-height: 1.5;
`;

const TitleInput = styled.input.attrs(props=>({
    type: 'text',
    size: props.size || '16px'
    }))`
    display: none;
    width: 300px;
    border: 1px solid #444;
    border-radius: 2px;
    padding: 8px;
`;

const Context = styled.p`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 30px;
    line-height: 1.4;
`;
const PublishDate = styled.p`
    color: #444;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 6px;
`;
const Author = styled.p`
    color: #444;
    font-size: 14px;
    font-weight: 400;
`;
const DeleteBtn = styled.button`
    margin-top: 20px;
`;
const Edit = styled.button`
    margin-top: 20px;
    margin-left: 10px;
`;
const Error = styled.div`
color: red;
`; 

export default function PostContent({postData}){
    let { id } = useParams()
    const { posts,setPosts } = useContext(ArticleData)
    const targetId = posts.find(data => data.id === Number(id))
    const [errMessage, setErrMessage] = useState('')
    const navigate = useNavigate()

    const handleEditTitle = () => {

    }
    const handleEdit = () => {
        putPost(id).then(data=>console.log(data))
    }
    const handleArticleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('確定要刪除嗎')){
            // 選擇確定執行
            deletePost(id)
            .then(data => {
                getPost()
                .then(data => {
                    setPosts(data)
                })
                navigate('/')
            })
            .catch(err => {
                setErrMessage(err)
                console.log('err',err)
            })
        }
    }
    return (
        <PostContainer>
            <inputGroup>
                <Title onClick={handleEditTitle}>{targetId.title}</Title>
                <TitleInput ></TitleInput>
            </inputGroup>
            <Context>{targetId.body}</Context>
            <PublishDate>發布日期: {new Date(targetId.createdAt).toLocaleString()}</PublishDate>
            <Author>作者: {targetId.username}</Author>
            <DeleteBtn onClick={handleArticleDelete}>刪除</DeleteBtn>
            {/* <Edit onClick={handleEdit}>編輯</Edit> */ }
            {errMessage && <Error>{errMessage}</Error>}
        </PostContainer>
    )
}