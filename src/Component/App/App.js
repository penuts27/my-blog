import { useState,useEffect } from 'react'
import styled from 'styled-components'
import Header from '../Header/Header'
import LoginPage from '../../pages/LoginPage/LoginPage';
import HomePage from '../../pages/HomePage/HomePage';
import PostContent from '../../pages/PostContent/PostContent';
import NewPost from '../../pages/NewPost/NewPost';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext,ArticleData } from '../../context';
import { getMe } from '../../WebAPI'
import { getAuthToken } from '../../utils';
import { getPost } from '../../WebAPI'


import './App.css';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  // user是否有值代表驗證有沒通過
  const [user,setUser] = useState(null)
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    getMe().then(res =>{
      // 檢查是否有token存在，有則call /me
      if(!getAuthToken()) return
      if(res.ok) {
        setUser(res.data)
      }
  })
  .catch(err=>console.log(err))
  },[])
  // 初始化資料
  useEffect(()=>{
    getPost()
    .then(data => {
        setPosts(data)
    })
    .catch(err => console.log(err))
},[])
  return (
    <ArticleData.Provider value={{posts,setPosts}}>
    <AuthContext.Provider value={{user,setUser}}>
      <Root>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/new-post" element={<NewPost/>} />
            <Route path="/posts/:id" element={<PostContent/>}/>
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
    </ArticleData.Provider>
  );
}

export default App;
