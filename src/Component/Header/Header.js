import styled from 'styled-components'
import { HashRouter as Router, Routes, Route, Link,useLocation,useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { setAuthToken } from '../../utils';
import { MEDIA_QUERY_MD } from '../../constants/breakpoint'


const HeaderContainer = styled.div`
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
    padding: 0 32px;
    background-color: #fff;
    box-sizing: border-box;
    ${MEDIA_QUERY_MD}{
        padding: 0 15px;
    }
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
const Brand = styled(Link)`
    font-size: 28px;
    font-weight: 700;
    margin-right: 20px;
    text-decoration: none;
    color: #000;
    ${MEDIA_QUERY_MD}{
        max-width: 90px;
        margin-right: 10px;
        font-size: 20px;
    }
`;
const PeronWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
const Hello = styled.div`
    display: flex;  
    margin-right: 10px;
    span{
        /*  θΆιι±θ  */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        color: #0d6efd;
        ${MEDIA_QUERY_MD}{
            overflow: hidden;

            max-width: 50px;
            margin-right: 10px;
            font-size: 20px;
        }
    }
    ${MEDIA_QUERY_MD}{
        display: none;
    }
`;
const NavbarList = styled.div`
     display:flex;
     align-items: center;
     height: 100%;
`;
const Nav = styled(Link)`
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100px;
    cursor: pointer;
    text-decoration: none;
    color: #000;

    ${MEDIA_QUERY_MD}{
        width: 70px;
    }
    ${props => props.$active && `
        background: rgba(0,0,0,.2)
    `}
`;
export default function Header() {
    const location = useLocation();
    const { user,setUser } = useContext(AuthContext)
    let navigate = useNavigate()
    // console.log(location.pathname)

    const handleLogout = () => {
        setAuthToken('')
        setUser('')
        if(location.pathname !== '/')navigate('/')
    }
    return (
        <HeaderContainer>
            <LeftContainer>
                <Brand to="/">ζηη¬¬δΈει¨θ½ζ Ό</Brand>
                <NavbarList>
                    <Nav to="/" $active={location.pathname === '/'}>ι¦ι </Nav>
                    {user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>ηΌεΈζη« </Nav>}
                </NavbarList>
            </LeftContainer>
            <LeftContainer>
                <NavbarList>
                    {user && 
                    <PeronWrapper>
                        <Hello><span>{user.nickname}</span><p>οΌζ¨ε₯½</p></Hello>
                        <Nav to="/" onClick={handleLogout}>η»εΊ</Nav>
                    </PeronWrapper>  
                    }
                    {/* θ₯θ·―εΎδ½η½?ηΊ/loginζ/signinοΌεε³ε₯$activeη΅¦Navη΅δ»Άfocusεη° */}
                    {!user && <Nav to="/login" $active={location.pathname === '/login' || location.pathname === '/signin'}>η»ε₯</Nav>}
                </NavbarList>
            </LeftContainer>
        </HeaderContainer>
    )
} 