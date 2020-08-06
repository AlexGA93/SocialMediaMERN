import React from "react";

const Navbar = () => {
  return (
    //any code that we want to design
    <nav class="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i class="fas fa-code"></i> DevConnector
        </a>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <a href="register.html">Register</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
