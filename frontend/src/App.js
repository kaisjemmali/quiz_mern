// import { Container } from "react-bootstrap";
// import Header from "./Components/Header";
// import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <div>
//       <Header />
//       <ToastContainer />
//       <Container className="my-2">
//         <Outlet />
//       </Container>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();

  // Fonction pour vérifier si la page est un tableau de bord (AdminDashboard ou UserDashboard)
  const isDashboardPage = () => {
    return (
      location.pathname === "/admin-dashboard" ||
      location.pathname === "/user-dashboard"
    );
  };

  return (
    <div>
      {/* Afficher le composant Header sauf sur les pages des tableaux de bord */}
      {!isDashboardPage() && <Header />}
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
      {!isDashboardPage() && <Footer />}
    </div>
  );
}

export default App;
