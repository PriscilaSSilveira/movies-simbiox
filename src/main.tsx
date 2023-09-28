import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Movies from './pages/movies.tsx'
import Search from './components/search.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="movie/:id" element={<Movies />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
)
