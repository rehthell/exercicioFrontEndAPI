import React from 'react';
//import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class Titulos extends React.Component {
  state = {
    titulos: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3003/titulo/`)
      .then(res => {
        const titulos = res.data;
        this.setState({ titulos });
      })
  }

  render() {
    return (
      <ul>
        { this.state.titulos.map(titulos => <li>{titulos.tx_descricao}</li>)}
      </ul>
    )
  }
}
  