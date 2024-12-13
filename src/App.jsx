import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Blank } from "./layouts/Blank";
import { Toaster } from 'react-hot-toast'; // Import Toaster

function App() {
  const location = useLocation();

  // Check for specific paths to conditionally render layouts
  const isAuthPath = location.pathname.includes("auth") || 
                     location.pathname.includes("error") || 
                     location.pathname.includes("under-maintenance") || 
                     location.pathname.includes("blank");

  return (
    <>
      {/* Add Toaster component here */}
      <Toaster position="top-right" /> {/* Adjust position as needed */}
      
      {isAuthPath ? (
        <AppRoutes>
          <Blank />
        </AppRoutes>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;
