import { lazy, Suspense, type ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import PageShell from './components/layout/PageShell'
import HomePage from './pages/HomePage'
import WritingIndexPage from './pages/WritingIndexPage'
import './styles/Portfolio.css'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'))
const KitchenSinkPage = lazy(() => import('./pages/KitchenSinkPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const WorkIndexPage = lazy(() => import('./pages/WorkIndexPage'))

function PageLoading({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <span className="sr-only" role="status">
          Loading page
        </span>
      }
    >
      {children}
    </Suspense>
  )
}

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PageLoading>
                <KitchenSinkPage />
              </PageLoading>
            }
            path="/dev/kitchen-sink"
          />
          <Route element={<PageShell />}>
            <Route index element={<HomePage />} />
            <Route
              element={
                <PageLoading>
                  <WorkIndexPage />
                </PageLoading>
              }
              path="work"
            />
            <Route element={<WritingIndexPage />} path="writing" />
            <Route
              element={
                <PageLoading>
                  <ArticleDetailPage />
                </PageLoading>
              }
              path="writing/:slug"
            />
            <Route
              element={
                <PageLoading>
                  <AboutPage />
                </PageLoading>
              }
              path="about"
            />
            <Route
              element={
                <PageLoading>
                  <NotFoundPage />
                </PageLoading>
              }
              path="*"
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
    </LazyMotion>
  )
}

export default App
