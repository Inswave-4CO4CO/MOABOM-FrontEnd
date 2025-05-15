import { Button } from "@chakra-ui/react";
import React from "react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Button>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Go to Login Page
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
