import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./store/User_Context";
import { useContext, Suspense, lazy } from "react";
import Header from "./components/Header/header";
import NotFound from "./NotFound";
import MainDashboard from "./app/dashboard/MainDashboard";

const User_Management_DashboardPage = lazy(() => import("./app/dashboard/User_Management/page"));
const Visitor_Insight_Page = lazy(() => import("./app/dashboard/Clueberry/Profile Analytics/Visitor_Insight/page"));
const Profile_Analytics = lazy(() => import("./app/dashboard/Clueberry/Profile Analytics/page"));
const ClueberryDashboardPage = lazy(() => import("./app/dashboard/Clueberry/page"));
const Create_Profile_Page = lazy(() => import("./app/dashboard/Clueberry/Create_Profile/page"));
const Reputation_management = lazy(() => import("./app/dashboard/Reputation_management/page"));
const Subscription = lazy(() => import("./app/dashboard/Subscription/Subscription"));
const UserProfilePage = lazy(() => import("./app/dashboard/profile/page"));
const LoginPage = lazy(() => import("./app/login/page"));
const ZensightDashboardPage = lazy(() => import("./app/dashboard/Zensight/page"));
const MyInsightsPage = lazy(() => import("./app/dashboard/Zensight/my_insights/page"));
const ActionsPage = lazy(() => import("./app/dashboard/Zensight/my_actions_list/page"));
const ImplementationPage = lazy(() =>
  import("./app/dashboard/Zensight/implemented/page")
);
const MyAction_Insight_View = lazy(() =>
  import("./app/dashboard/Zensight/my_actions_list/Insight/Page")
);
const MyTodo_Insight_View = lazy(() =>
  import("./app/dashboard/Zensight/implemented/Insight/Page")
);
const ForgotPassword = lazy(() => import("./app/verify/ForgotPassword"));
const NewPassword = lazy(() => import("./app/verify/newPasswordForm"));

const UpdateProfilePage = lazy(() => import("./app/dashboard/profile/update/UpdateProfilePage"));

const App = () => {
  const { auth } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header auth={auth} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {!auth &&
            <>
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/forgot_password/:token" element={<NewPassword />} />
            </>
          }
          {auth && (
            <>
              <Route path="/dashboard" element={<MainDashboard />} />
              <Route path="/dashboard/Zensight" element={<ZensightDashboardPage />} />
              <Route
                path="/dashboard/Zensight/my_insights"
                element={<MyInsightsPage />}
              />
              <Route
                path="/dashboard/Zensight/my_actions_list"
                element={<ActionsPage />}
              />
              <Route
                path="/dashboard/Zensight/my_actions_list/:insightId"
                element={<MyAction_Insight_View />}
              />
              <Route
                path="/dashboard/Zensight/implemented"
                element={<ImplementationPage />}
              />
              <Route path="/dashboard/subscription" element={<Subscription />} />
              <Route path="/dashboard/profile" element={<UserProfilePage />} />
              <Route path="/dashboard/profile/update" element={<UpdateProfilePage />} />
              <Route
                path="/dashboard/Zensight/implemented/:insightId"
                element={<MyTodo_Insight_View />}
              />
              {/* Clueberry */}
              <Route path="/dashboard/Clueberry" element={<ClueberryDashboardPage />} />
              <Route path="/dashboard/Clueberry/create_profile" element={<Create_Profile_Page />} />
              <Route path="/dashboard/Clueberry/profile_analytics" element={<Profile_Analytics />} />
              <Route path="/dashboard/Clueberry/profile_analytics/visitor_insight" element={<Visitor_Insight_Page />} />
              {/* User_Management */}
              <Route path="/dashboard/User_Management" element={<User_Management_DashboardPage />} />

              <Route path="/dashboard/Reputation_management" element={<Reputation_management />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
