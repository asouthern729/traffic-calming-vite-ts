import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "@/pages/Login"
import Petitions from "@/pages/Petitions"
import Update from "@/pages/Update"
import Create from "@/pages/Create"
import Public from "@/pages/Public"
import Respondent from "@/pages/Respondent"
import Redirect from "@/pages/Redirect"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/petitions" element={<Petitions />} />
          <Route path="/petitions/update/:uuid" element={<Update />} />
          <Route path="/petitions/create" element={<Create />} />
          <Route path="/public" element={<Public />} />
          <Route path="/respondent" element={<Respondent />} />
          <Route path="/*" element={<Redirect />} />
        </Routes>
      </Router>
      <ToastContainer limit={1} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App