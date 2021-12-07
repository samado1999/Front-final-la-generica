import React, { Component } from "react";

import UserService from "../services/user.service";

import "../App.css";

export default class ProductoAdmin extends Component {
    state = {
        content: ""
    };

    CargarProductos = (e) => {
        e.preventDefault();
        UserService.getAdminProducto().then(
            response => {
                alert("Productos cargados correctamente " + response.data);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    };

    render() {
        return (
            <div className="producto-container">
                <div className="row">
                    <div className="col-md-auto mx-auto">
                        <p className="titulo-productos">
                            <b className="titulo">CARGAR PRODUCTOS</b>
                        </p>
                        <div className="botones">
                            <button className="boton-subir-archivo">
                                <input type="file" name="fileupload" />
                            </button>
                            <br></br>
                            <button className="boton-publicar" >
                                <input type="submit" value="Upload csv" name="submit" onClick={this.CargarProductos} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
