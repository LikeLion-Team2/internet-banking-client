import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import Profile from "./routes/profile/profile";
import AccountPage from "./routes/account/account-page";
import Home from "./routes/home/home";
import Withdraw from "./routes/withdraw/withdraw";
import Deposit from "./routes/deposit/deposit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
    children: [
      // 로그인 페이지
      {
        index: true,
        path: "login",
        element: <Login />,
      },
      // 회원가입 페이지
      {
        path: "signup",
        element: <Signup />,
      },
      // 사용자 홈 페이지
      {
        path: "home",
        element: <Home />,
      },
      // 사용자 프로필 페이지
      {
        path: "profile",
        element: <Profile />,
      },
      // 계좌 페이지 (잔액, 입출금 내역 조회 등)
      {
        path: "account/:accountId",
        element: <AccountPage />,
      },
      // 이체(출금) 페이지 ()
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      // 이체(입금) 페이지 ()
      {
        path: "deposit",
        element: <Deposit />,
      },
    ],
  },
]);