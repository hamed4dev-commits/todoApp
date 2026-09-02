
import { ToastContainer } from "react-toastify";
import AuthInitializer from "./AuthInitializer";
import SidebarWrapper from "./SidebarWrapper";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthInitializer />
        
          {children}
        
      <ToastContainer />
    </>
  );
};

export default wrapper;
