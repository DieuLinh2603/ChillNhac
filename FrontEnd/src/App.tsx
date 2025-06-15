import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/homePage";
import AuthCallbackPage from "./Pages/Home/Auth-Callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import ChatPage from "./Pages/Chat/ChatPage";
import AlbumPage from "./Pages/Album/AlbumPage";
import AdminPage from "./Pages/Admin/AdminPage";
import {Toaster} from "react-hot-toast"
import NotFoundPage from "./Pages/404/NotFoundPage";
import SearchPage from "./Pages/Search/SearchPage";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />


        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/*" element={<NotFoundPage/>} />
          <Route path="/search" element={<SearchPage/>}></Route> 
        </Route>
      </Routes>

      {/* hiển thị thông báo */}
      <Toaster/>
    </>
  );
}

export default App;
