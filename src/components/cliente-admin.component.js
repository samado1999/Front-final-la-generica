import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import "../App.css";

const validate = (values) => {
    const errors = {};
    if (!values.cedula) {
        errors.cedula = "Requerido";
    }
    if (!values.telefono) {
        errors.telefono = "Requerido";
    }
    if (!values.nombre) {
        errors.nombre = "Requerido";
    }
    if (!values.email) {
        errors.email = "Requerido";
    }
    if (!values.direccion) {
        errors.direccion = "Requerido";
    }
    return errors;
};

const validateConsultar = (values) => {
    const errors = {};
    if (!values.cedula) {
        errors.cedula = "Requerido";
    }
    return errors;
};

export default class ClienteAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            errors: {
                cedula: "",
                telefono: "",
                nombre: "",
                email: "",
                direccion: "",
            },
            cedula: "",
            direccion: "",
            email: "",
            nombre: "",
            telefono: "",
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

        UserService.getAdminCliente().then(
            response => {
                this.setState({
                    content: response.data,
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    Consultar = (event) => {
        event.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const result = validateConsultar(sinErrors);
        console.log(result);
        this.setState({ errors: result });
        if (!Object.keys(result).length) {
            console.log("Enviar el formulario consultar");
            // document.getElementById("create-course-form").reset();
            UserService.getAdminClienteConsultar(this.state.cedula).then(
                response => {
                    this.setState({
                        cedula: response.data.cedula,
                        direccion: response.data.direccion,
                        email: response.data.correo,
                        nombre: response.data.nombre,
                        telefono: response.data.telefono,
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        }
    };

    Crear = (event) => {
        event.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const result = validate(sinErrors);
        this.setState({ errors: result });
        if (!Object.keys(result).length) {
            console.log("Enviar el formulario crear");
            // document.getElementById("create-course-form").reset();
            let cliente = {};
            cliente.cedula = this.state.cedula;
            cliente.telefono = this.state.telefono;
            cliente.nombre = this.state.nombre;
            cliente.correo = this.state.email;
            cliente.direccion = this.state.direccion;
            UserService.getAdminClienteCreate(cliente).then(
                response => {
                    this.setState({
                        content: response.data
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
            alert('Estatus cliente: ' + this.state.content);
            document.getElementById("create-course-form").reset();
        }
    };

    Borrar = (event) => {
        event.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const result = validate(sinErrors);
        this.setState({ errors: result });
        if (!Object.keys(result).length) {
            console.log("Enviar el formulario borrar");
            // document.getElementById("create-course-form").reset();
            window.location.reload(false);
        }
    };

    Actualizar = (event) => {
        event.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const result = validate(sinErrors);
        this.setState({ errors: result });
        if (!Object.keys(result).length) {
            console.log("Enviar el formulario actualizar");
            // document.getElementById("create-course-form").reset();
            window.location.reload(false);
        }
    };

    render() {
        const { showAdminBoard } = this.state;
        const { errors } = this.state;
        return (
            <div className="cliente-container">
                {showAdminBoard && (
                    <form id="create-course-form">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Cédula</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Cédula"
                                    onChange={this.handleChange}
                                    name="cedula"
                                    value={this.state.cedula}
                                />
                                {errors.cedula && <p className='p-error'>{errors.cedula}</p>}
                            </div>
                            <div className="form-group col-md-6">
                                <label>Teléfono</label>
                                <input
                                    id="telefono"
                                    type="number"
                                    className="form-control"
                                    placeholder="Teléfono"
                                    onChange={this.handleChange}
                                    name="telefono"
                                    value={this.state.telefono}
                                />
                                {errors.telefono && <p className='p-error'>{errors.telefono}</p>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Completo"
                                    onChange={this.handleChange}
                                    name="nombre"
                                    value={this.state.nombre}
                                />
                                {errors.nombre && <p className='p-error'>{errors.nombre}</p>}
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={this.state.email}
                                />
                                {errors.email && <p className='p-error'>{errors.email}</p>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección"
                                    onChange={this.handleChange}
                                    name="direccion"
                                    value={this.state.direccion}
                                />
                                {errors.direccion && <p className='p-error'>{errors.direccion}</p>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <button type="submit" id="consultar" className="cliente-button" onClick={this.Consultar}>
                                    Consultar
                                </button>
                            </div>
                            <div className="form-group col-md-3">
                                <button type="submit" id="crear" className="cliente-button" onClick={this.Crear}>
                                    Crear
                                </button>
                            </div>
                            <div className="form-group col-md-3">
                                <button type="submit" id="actualizar" className="cliente-button" onClick={this.Actualizar}>
                                    Actualizar
                                </button>
                            </div>
                            <div className="form-group col-md-3">
                                <button type="submit" id="borrar" className="cliente-button" onClick={this.Borrar}>
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
