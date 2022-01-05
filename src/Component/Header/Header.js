import styled from 'styled-components'
import { HashRouter as Router, Routes, Route, Link,useLocation,useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
    height: 64px;
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
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
const Brand = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-right: 20px;
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

    ${props => props.$active && `
        background: rgba(0,0,0,.2)
    `}
`;
export default function Header() {
    const location = useLocation();
    const { user,setUser } = useContext(AuthContext)
    let navigate = useNavigate()
    console.log(location.pathname)

    const handleLogout = () => {
        setAuthToken('')
        setUser('')
        if(location.pathname !== '/')navigate('/')
    }
    return (
        <HeaderContainer>
            <LeftContainer>
                <Brand>我的第一個部落格</Brand>
                <NavbarList>
                    <Nav to="/" $active={location.pathname === '/'}>首頁</Nav>
                    {user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>發布文章</Nav>}
                </NavbarList>
            </LeftContainer>
            <LeftContainer>
                <NavbarList>
                    {user && <Nav to="/" onClick={handleLogout}>登出</Nav>}
                    {!user && <Nav to="/login" $active={location.pathname === '/login'}>登入</Nav>}
                </NavbarList>
            </LeftContainer>

        </HeaderContainer>
    )
} 