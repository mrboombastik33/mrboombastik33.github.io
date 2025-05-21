import './App.css'
import Page_Header from './components/header'
import Footer from './components/footer'
import Main_Page from './pages/main_page'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Gallery_Page from './pages/gallery'
import ProgressPage from './pages/progress'
import Lessons_Page from './pages/lesson_page'

function App() {
  return (
    <>
    <BrowserRouter>
      <Page_Header />
      <Routes>
        <Route path = "/" element = {<Main_Page/>} />
        <Route path = "/gallery" element = {<Gallery_Page/>} />
        <Route path = "/progress" element = {<ProgressPage/>}/>
        <Route path = "lessons/*" element = {<Lessons_Page/>}/>
      </Routes>
      <Footer/>
  </BrowserRouter>
    </>
  )
}

export default App
