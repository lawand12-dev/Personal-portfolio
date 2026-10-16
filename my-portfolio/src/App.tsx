import { LazyMotion, domAnimation } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import PageShell from './components/layout/PageShell'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import KitchenSinkPage from './pages/KitchenSinkPage'
import NotFoundPage from './pages/NotFoundPage'
import WorkIndexPage from './pages/WorkIndexPage'
import WritingIndexPage from './pages/WritingIndexPage'
import './styles/Portfolio.css'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Routes>
          <Route path="/dev/kitchen-sink" element={<KitchenSinkPage />} />
          <Route element={<PageShell />}>
            <Route index element={<HomePage />} />
            <Route path="work" element={<WorkIndexPage />} />
            <Route path="writing" element={<WritingIndexPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  )
}

export default App