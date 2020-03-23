import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
   logout = event => {
      event.preventDefault();
      this.props.logout();
   };
   render() {
      return (
         <nav className="navbar navbar-expand">
            <div className="containter-fluid">
               <Link to="/" className="navbar-brand">
                  <img src={Logo} alt="Warbler Home"></img>
               </Link>
            </div>
            {this.props.currentUser.isAuthenticated ? (
               <ul className="navbar-nav ml-auto">
                  <li>
                     <Link
                        to={`/users/${this.props.currentUser.user.id}/messages/new`}
                     >
                        New Message
                     </Link>
                  </li>
                  <li>
                     <a onClick={this.logout}>Log Out</a>
                  </li>
               </ul>
            ) : (
               <ul className="navbar-nav ml-auto">
                  <li>
                     <Link to="/signup">Sign up</Link>
                  </li>
                  <li>
                     <Link to="/signin">Log in</Link>
                  </li>
               </ul>
            )}
         </nav>
      );
   }
}

const mapStateToProps = state => {
   return {
      currentUser: state.currentUser
   };
};

export default connect(mapStateToProps, { logout })(Navbar);
