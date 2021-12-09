import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import "../App.css";
import AuthService from "../services/auth.service";

export default class ProductoAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
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

        UserService.getAdminBoard().then(
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
    }

    render() {
        const { showAdminBoard } = this.state;
        let list = [];

        const handleForce = (data, fileInfo) => {
            for (let i = 0; i < data.length; i++) {
                const prod = {};
                prod.productCode = String(data[i][0]);
                prod.productName = String(data[i][1]);
                prod.supplierNit = String(data[i][2]);
                prod.buyPrice = String(data[i][3]);
                prod.iva = String(data[i][4]);
                prod.sellPrice = String(data[i][5]);
                list.push(prod);
            }
        };

        const handleFiles = () => {
            if (list.length > 0) {
                UserService.getAdminProducto(list).then(
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
            } else {
                alert("No hay datos");
            }
        };

        const papaparseOptions = {
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
        };
        return (
            <div className="producto-container">
                {showAdminBoard && (
                    <div className="row">
                        <div className="col-md-auto mx-auto">
                            <p className="titulo-productos">
                                <b className="titulo">CARGAR PRODUCTOS</b>
                            </p>
                            <div className="botones">
                                <button className="boton-subir-archivo">
                                    <CSVReader
                                        cssClass="react-csv-input"
                                        onFileLoaded={handleForce}
                                        parserOptions={papaparseOptions}
                                    />
                                </button>
                                <br></br>
                                <button className="boton-publicar" >
                                    <input type="submit" value="Upload csv" name="submit" onClick={handleFiles} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}