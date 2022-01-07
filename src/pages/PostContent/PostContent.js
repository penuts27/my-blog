import { useState } from 'react'
import { useContext } from 'react';
import { login,getMe } from '../../WebAPI'
import styled from 'styled-components'
import { useNavigate,useParams } from "react-router-dom";
import { setAuthToken } from '../../utils'
import { ArticleData } from '../../context'

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

export default function PostContent({postData}){
    let { id } = useParams()
    const { posts } = useContext(ArticleData)
    const targetId = posts.find(data => data.id === Number(id))
    return (
        <PostContainer>
            <Title>{targetId.title}</Title>
            <Context>{targetId.body}</Context>
            <PublishDate>發布日期: {new Date(targetId.createdAt).toLocaleString()}</PublishDate>
            <Author>作者: {targetId.username}</Author>
        </PostContainer>
    )
}