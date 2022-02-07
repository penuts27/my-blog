import styled from 'styled-components'
import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Routes, Route, Link,useLocation } from "react-router-dom";
import { AuthContext,ArticleData } from '../../context'
import Paginator from '../../Component/Paginator/Paginator'
import { MEDIA_QUERY_MD } from '../../constants/breakpoint'

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
    box-sizing: border-box;
    & + & {
         margin-top: 10px;
    }
    ${MEDIA_QUERY_MD}{
        display: block;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
    }
`;
const PostTitle = styled.div`
        /*  超過...隱藏  */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        font-size: 20px;
        font-weight: 700;
        word-break: break-all;
        ${MEDIA_QUERY_MD}{
            margin-bottom: 10px;
        }
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

// 以後刪除我
const ARTICLE_PER_PAGE = 20


export default function HomePage() {
    const { posts,setPosts } = useContext(ArticleData)
    const [ currentPage, setCurrentPage ] = useState(1)

    const getAticleByPage = (page) => {
        // 0 20 40
        const startIndex =  (page - 1) * ARTICLE_PER_PAGE
        // 20 40 
        const endIndex = page * ARTICLE_PER_PAGE
        const result = posts.slice(startIndex,endIndex)
        return result
    }
    return (
        <Root>
            {
                getAticleByPage(currentPage).map(post => <Post key={post.id} post={post}></Post>)
            }
            <Paginator setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </Root>
    )
} 