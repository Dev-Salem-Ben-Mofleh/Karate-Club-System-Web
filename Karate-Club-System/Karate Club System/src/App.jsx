import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import GlobalStayles from "./styles/GlobalStayles";
import Dashboard from "./pages/Dashboards";
import Members from "./pages/Members";
import Users from "./pages/Users";
import Instructors from "./pages/Instructors";
import MemberInstructor from "./pages/MemberInstructor";
import BeltRanks from "./pages/BeltRanks";
import ShowMemberInstructorDetails from "./features/MemberInstructor/ShowMemberInstructorDetails";
import SubscriptionPeriod from "./pages/SubscriptionPeriod";
import RenewPeriod from "./features/Subscription Period/RenewPeriod";
import ShowPeriodInformations from "./features/Subscription Period/ShowPeriodInformations";
import Tests from "./pages/Tests";
import TakeNextBeltTest from "./features/Belt Tests/TakeNextBeltTest";
import Payment from "./pages/Payment";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import Login from "./pages/Login";
import UpdateMemberIntructor from "./features/MemberInstructor/UpdateMemberIntructor";
import CreateMemberInstructor from "./features/MemberInstructor/CreateMemberInstructor";
import UpdatePeriod from "./features/Subscription Period/UpdatePeriod";
import CreatePeriod from "./features/Subscription Period/CreatePeriod";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStayles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="login" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="users" element={<Users />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="memberInstructor" element={<MemberInstructor />} />
            <Route
              path="add-member-instructor/:id"
              element={<CreateMemberInstructor />}
            />
            <Route
              path="update-member-instructor/:id"
              element={<UpdateMemberIntructor />}
            />
            <Route
              path="show-member-instructor"
              element={<ShowMemberInstructorDetails />}
            />
            <Route path="beltRanks" element={<BeltRanks />} />
            <Route path="subscriptionPireod" element={<SubscriptionPeriod />} />
            <Route
              path="add-subscription-Pireod/:id"
              element={<CreatePeriod />}
            />
            <Route
              path="update-subscription-Pireod/:id"
              element={<UpdatePeriod />}
            />
            <Route path="renew-subscription-Pireod" element={<RenewPeriod />} />
            <Route
              path="show-subscription-Pireod"
              element={<ShowPeriodInformations />}
            />
            <Route path="beltTest" element={<Tests />} />
            <Route path="take-next-belt-test" element={<TakeNextBeltTest />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "Box" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
export default App;
