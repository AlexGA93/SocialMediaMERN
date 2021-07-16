import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

//to connect this omponent to redux
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

/*
In a form each input should need a component state
*/
const Register = ({ setAlert, register, isAuthenticated }) => {
  //we shoud be capable to do props.setAlert
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  }); //state

  const { name, email, password, password2 } = formData; //Every data like 'name' or 'email' should be asociated with the form inputs

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //In setFormData we want to change the state

  const onSubmit = async (e) => {
    e.preventDefault();
    //checking passwords
    if (password !== password2) {
      //We want to send an Alert so we need to connect this component with redux
      setAlert("passwords do not match!", "danger"); //calling setAlert function

      // console.log("passwords do not match!");
    } else {
      //console.log(formData); //If passwords match, show form state
      //
      register({ name, email, password });
    }
  };

  //Redirect  if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            //required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            //minLength="6"
            value={password}
            onChange={onChange}
            //required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            //minLength="6"
            value={password2}
            onChange={onChange}
            //required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
