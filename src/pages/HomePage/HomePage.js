import styled from 'styled-components'
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Routes, Route, Link,useLocation } from "react-router-dom";
import { getPost } from '../../WebAPI'

const Root = styled.div``;

const PostWrapper = styled(Link)`
    border-bottom: 1px solid rgba(0,0,0,.2);
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    text-decoration: none;
    color: #000;

     & + & {
         margin-top: 10px;
     }
`;
const PostTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    word-break: break-all;
`;
const PostDate = styled.div`
    color: #999;
    flex-shrink: 0;
`;
const Post = ({post}) => {
    return (
        <PostWrapper to={`/posts/${post.id}`}>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostWrapper>
    )
};
Post.propTypes = {
    post: PropTypes.object
}

export default function Header() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        getPost()
        .then(data => setPosts(data))
        .catch(err => console.log(err))
    },[])
    
    return (
        <Root>
            {
                posts.map(post => <Post key={post.id} post={post}></Post>)
            }
        </Root>
    )
} 