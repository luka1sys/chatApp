import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Nav from "./components/UI/Nav";
import Login from "./pages/Login";
import Chats from "./pages/chats";
import { ToastContainer } from "react-toastify";





const App = () => {

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <Nav />
      <ToastContainer />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Chats />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;
