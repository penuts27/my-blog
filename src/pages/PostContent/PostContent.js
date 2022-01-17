import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe } from '../../WebAPI'
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
const Title =styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
    line-height: 1.5;
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

export default function PostContent({postData}){
    let { id } = useParams()
    const { posts,setPosts } = useContext(ArticleData)
    const targetId = posts.find(data => data.id === Number(id))
    const [errMessage, setErrMessage] = useState('')
    const navigate = useNavigate()

    const Error = styled.div`
        color: red;
    `; 

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
            <Title>{targetId.title}</Title>
            <Context>{targetId.body}</Context>
            <PublishDate>發布日期: {new Date(targetId.createdAt).toLocaleString()}</PublishDate>
            <Author>作者: {targetId.username}</Author>
            <DeleteBtn onClick={handleArticleDelete}>刪除</DeleteBtn>
            {errMessage && <Error>{errMessage}</Error>}
        </PostContainer>
    )
}