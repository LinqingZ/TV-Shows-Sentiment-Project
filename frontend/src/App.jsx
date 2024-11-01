import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./layouts/auth";
import MainLayout from "./layouts/main";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import TVShow from "./pages/show";
import TVShows from "./pages/shows";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} /> 
            <Route path="/auth/signup" element={<Signup />} /> 
          </Route>
          <Route path="/tv-shows" element={<MainLayout />}>
            <Route path="/tv-shows" element={<TVShows />} /> 
            <Route path="/tv-shows/:id" element={<TVShow />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
