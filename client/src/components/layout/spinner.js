//Charging page summoning a gif
import React, { Fragment } from "react";
import spinner from "../../img/spinnerR.gif";

const spinner_func = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "100px", margin: "auto", display: "block" }}
      alt="Loading ..."
    />
  </Fragment>
);

export default spinner_func;