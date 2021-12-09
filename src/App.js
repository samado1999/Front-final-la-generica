import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ProductoAdmin from "./components/producto-admin.component";
import ClienteAdmin from "./components/cliente-admin.component";
import VentaAdmin from "./components/venta-admin.component";
import ReporteAdmin from "./components/reporte-admin.component";
import ConsolidadoAdmin from "./components/consolidado-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

// In line style
const styles = {
  backgroundColor: "#83acdf",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark" style={styles}>
          <Link to={"/"} className="navbar-brand">
            Tienda genérica
          </Link>
          <div className="navbar-nav mr-auto">
            {/*
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                <p className="p-menu">Home</p>
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  <p className="p-menu">Moderator Board</p>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  <p className="p-menu">Admin Board</p>
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  <p className="p-menu">User</p>
                </Link>
              </li>
            )}
            */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/producto"} className="nav-link">
                  <p className="p-menu">Producto</p>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/cliente"} className="nav-link">
                  <p className="p-menu">Cliente</p>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/venta"} className="nav-link">
                  <p className="p-menu">Venta</p>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/reporte"} className="nav-link">
                  <p className="p-menu">Reporte</p>
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/consolidado"} className="nav-link">
                  <p className="p-menu">Consolidado</p>
                </Link>
              </li>
            )}
          </div>

          {
            currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <p className="p-menu">{currentUser.username}</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    <p className="p-menu">Salir</p>
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <p className="p-menu">Iniciar sesión</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <p className="p-menu">Registrar</p>
                  </Link>
                </li>
              </div>
            )
          }
        </nav >

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/producto" component={ProductoAdmin} />
            <Route path="/cliente" component={ClienteAdmin} />
            <Route path="/venta" component={VentaAdmin} />
            <Route path="/reporte" component={ReporteAdmin} />
            <Route path="/consolidado" component={ConsolidadoAdmin} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div >
    );
  }
}

export default App;
