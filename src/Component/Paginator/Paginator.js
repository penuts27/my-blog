import styled from 'styled-components'
import {useContext} from 'react'
import { ArticleData } from '../../context'

const PaginatorWrapper = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 40px;
`;
const PageItem = styled.li`
    height: 38px;
    width: 35px;

    a{
        color: ${props => props.active === 'active' && '#fff'};
        background-color: ${props => props.active === 'active' && '#0d6efd'};
    }
`;
const PageLink = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d6efd;
    background-color: #fff;
    border: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
`;

const ARTICLE_PER_PAGE = 20

export default function Paginator ({ currentPage,setCurrentPage }) {
    const {posts,setPosts} = useContext(ArticleData)
    const pageArr = (posts) => {
        // 總共幾頁
        const pageNums = Math.ceil(posts.length / ARTICLE_PER_PAGE)
        // 創造頁數陣列，ex:[1,2,3,4]
        const num = Array.from(Array(pageNums).keys())
        return num

        
    }
    const handlePageClicked = (pageNum) => {
        return () => {
            setCurrentPage(pageNum)
        }
    }
    return (
        <PaginatorWrapper>
            {
                pageArr(posts).map((post,index) => {
                    const pageNum = index+1
                    return (
                        <PageItem key={pageNum} active={pageNum === currentPage ? 'active'  : ''}>
                            <PageLink as="a" herf="#" onClick={handlePageClicked(pageNum)}>{pageNum}</PageLink>
                        </PageItem>
                        )
                })
            }
        </PaginatorWrapper>
    )
}