import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import { AppProvider } from "./context/App/AppContext"
import { UserProvider } from "./context/User/UserContext"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login/Login"
import Staff from "./pages/Staff/Staff"
import Update from "./pages/Update/Update"
import Create from "./pages/Create/Create"
import Public from "./pages/Public/Public"
import Respondent from "./pages/Respondent/Respondent"

const queryClient = new QueryClient()

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename={APP_BASE}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/update/:uuid" element={<Update />} />
              <Route path="/create" element={<Create />} />
              <Route path="/" element={<Public />} />
              <Route path="/respondent" element={<Respondent />} />
            </Routes>
          </Router>
          <ToastContainer limit={1} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App