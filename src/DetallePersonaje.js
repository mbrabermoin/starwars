import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

export default class listaPersonajes extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        personaje: this.props.personaje,
        listado: [],
        openList: false,
        tipoDeLista: "",
        planeta: "",
    }
  }
  componentDidMount() {
    axios.get(this.state.personaje.homeworld)
      .then(res => {
        let planet = res.data;
        console.log(planet)
        this.setState({ planeta: planet});
      })
  }
    searchfilms() {
        var lista = [];
        this.state.personaje.films.forEach(element =>
            axios.get(element)
                .then(res => {
                    lista.push(res.data)
                }
                )
        )
        setTimeout(() => {
            this.setState({ listado: lista });
            this.setState({ tipoDeLista: "films" });
            this.handleOpenList()
        },
            1000);
    }
    searchvehicles() {
        var lista = [];
        this.state.personaje.vehicles.forEach(element =>
            axios.get(element)
                .then(res => {
                    lista.push(res.data)
                }
                )
        )
        setTimeout(() => {
            this.setState({ listado: lista });
            this.setState({ tipoDeLista: "vehicles" });
            this.handleOpenList()
        },
            1000);
    }
    searchStarships() {
        var lista = [];
        this.state.personaje.starships.forEach(element =>
            axios.get(element)
                .then(res => {
                    lista.push(res.data)
                }
                )
        )
        setTimeout(() => {
            this.setState({ listado: lista });
            this.setState({ tipoDeLista: "starships" });
            this.handleOpenList()
        },
            1000);
    }
    searchspecies() {
        var lista = [];
        this.state.personaje.species.forEach(element =>
            axios.get(element)
                .then(res => {
                    lista.push(res.data)
                }
                )
        )
        setTimeout(() => {
            this.setState({ listado: lista });
            this.setState({ tipoDeLista: "species" });
            this.handleOpenList()
        },
            1000);
    }
    handleCloseList = () => {
        this.setState({ openList: false })
    }
    handleOpenList = () => {
        this.setState({ openList: true })
    }
    handleCloseModal = () => {
        this.props.cerrarModal();
    }
    render() {
        var lista = "";
        if (this.state.tipoDeLista === "films") {
            lista = <ul style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {this.state.listado.map(lista => <li style={{ listStyle: "none" }}>{lista.title} - Episode:{lista.episode_id}</li>)}
            </ul>
        } else {
            if (this.state.tipoDeLista === "vehicles" || this.state.tipoDeLista === "starships") {
                lista = <ul style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {this.state.listado.map(lista => <li style={{ listStyle: "none" }}>{lista.name} - Model:{lista.model}</li>)}
                </ul>
            }else{
                if (this.state.tipoDeLista === "species") {
                    lista = <ul style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {this.state.listado.map(lista => <li style={{ listStyle: "none" }}>{lista.name} - Type:{lista.classification}</li>)}
            </ul>
                }
            }
        }
        if (this.state.listado.length === 0){
            lista = <div>No results found.</div>
        }
        return (
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center', minWidth: 800, minHeight: 300
            }}>
                <div className="closeButton" onClick={this.handleCloseModal}>X</div>
                <h1>{this.state.personaje.name}</h1>
                <h3>Mass: {this.state.personaje.mass}</h3>
                <h3>Height: {this.state.personaje.height} cm</h3>
                <h3>Hair Color: {this.state.personaje.hair_color}</h3>
                <h3>Skin Color: {this.state.personaje.skin_color}</h3>
                <h3>Eye Color: {this.state.personaje.eye_color}</h3>
                <h3>Birth Year: {this.state.personaje.birth_year}</h3>
                <h3>Gender: {this.state.personaje.gender}</h3>
                <h3>Planet: {this.state.planeta.name}</h3>
                <div id="buttonscontainer">
                    <div className="buttons">
                        <Button onClick={() => { this.searchfilms() }} variant="contained" color="primary">
                            FILMS
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.searchvehicles() }} variant="contained" color="primary">
                            VEHICLES
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.searchStarships() }} variant="contained" color="primary">
                            STARSHIPS
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.searchspecies() }} variant="contained" color="primary">
                            SPECIES
                        </Button>
                    </div>
                </div>
                <Modal
                    open={this.state.openList}
                    onClose={this.handleCloseList}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >                    
                    <div style={{ background: "grey", width: 600, textAlign: "center", borderRadius: 5 }}>
                        <h2>List of {this.state.tipoDeLista}</h2>
                        {lista}
                        <div className="buttons">
                        <Button onClick={() => { this.handleCloseList() }} variant="contained" color="primary">
                            CLOSE
                        </Button>
                    </div>
                    </div>
                </Modal>
            </div>
        )
    }
}