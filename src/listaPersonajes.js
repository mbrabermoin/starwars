import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Detalle from './DetallePersonaje.js';

export default class listaPersonajes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personajes: [],
      next: "",
      previous: "",
      actualPage: 1,
      openDetail: false,
    }
  }

  componentDidMount() {
    axios.get(`https://swapi.dev/api/people/?`)
      .then(res => {
        let persons = res.data.results;
        let next = res.data.next;
        let previous = res.data.previous;
        this.setState({ personajes: persons, next: next, previous: previous, actualPage: 1 });
      })
  }

  goPrevious() {
    axios.get(this.state.previous)
      .then(res => {
        let persons = res.data.results;
        let next = res.data.next;
        let previous = res.data.previous;
        let actual = this.state.actualPage;
        this.setState({ personajes: persons, next: next, previous: previous, actualPage: actual - 1 });
      })
  }
  goNext() {
    axios.get(this.state.next)
      .then(res => {
        let persons = res.data.results;
        let next = res.data.next;
        let previous = res.data.previous;
        let actual = this.state.actualPage;
        this.setState({ personajes: persons, next: next, previous: previous, actualPage: actual + 1 });
      })
  }
  selectCharacter(person) {
    console.log(person)
    this.setState({ openDetail: true })
    this.setState({ personaje: person })
  }
  handleCloseDetail = () => {
    this.setState({ openDetail: false })
  }
  handleOpenDetail = () => {
    this.setState({ openDetail: true })
  }
  render() {
    var previousButton = "";
    var nextButton = "";
    if (this.state.previous != null) {
      previousButton = <Button onClick={() => { this.goPrevious() }} variant="contained" color="primary">
        Previous
          </Button>
    } else {
      previousButton = <Button disabled variant="contained" color="primary">
        Previous
          </Button>
    }
    if (this.state.next != null) {
      nextButton = <Button onClick={() => { this.goNext() }} variant="contained" color="primary">
        Next
    </Button>
    } else {
      nextButton = <Button disabled variant="contained" color="primary">
        Next
    </Button>
    }
    return (
      <div>
        <ul id="lista-personajes">
          {this.state.personajes.map(person => <li style={{ listStyle: "none" }} onClick={() => { this.selectCharacter(person) }}>{person.name}</li>)}
        </ul>
        <div style={{ display: "flex", }}>
          <div style={{ margin: 40 }}>
            {previousButton}
          </div>
          <div style={{ margin: 40 }}>
            {this.state.actualPage}
          </div>
          <div style={{ margin: 40 }}>
            {nextButton}
          </div>
        </div>
        <Modal
          open={this.state.openDetail}
          onClose={this.handleCloseDetail}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: "grey" }}>
            <Detalle personaje={this.state.personaje} cerrarModal={this.handleCloseDetail}></Detalle>
          </div>
        </Modal>
      </div>
    )
  }
}