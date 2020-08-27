//We want to visualize the Alert as component
import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const Alert = (
  { alerts } // ({alerts}) <===> (props) as alerts with mapstatetoprops
) =>
  (alerts !== null) & (alerts.length > 0) &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

//prop must be array
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//The alert component that we just created is getting that state
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
