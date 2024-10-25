/*
    Aluna: Rebeca M.C.T. Figueiredo
    Matricula: 2019012144
    Disciplina:Programação 3
    Prof.: Alex Paulo
    Turma: 2021.2
    PROVA 1
*/


import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
//import Titulos from './Pages/Titulos';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  state = {
    disciplinas: [],
    loading: true
  }
  //roda quando a tela é criada Requisição da APIna porta 3004
  componentDidMount() {
    axios.get(`http://localhost:3004/disciplina/`)
      .then(res => {
        const disciplinas = res.data;
        this.setState({ disciplinas, loading: false });
      })
  }

  render() {
    const mystyle = {
      border: "none",
      width: "50%"
    };
    return (
      <Container fluid="md" className="justify-content-md-center">
        {this.state.loading ?<Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button> :

          <Card style={mystyle} className="text-center">            
            <Card.Body>
              <Card.Title>DISCIPLINAS</Card.Title>
              <Table striped bordered hover size="">
                <thead style={{ backgroundColor: "#DEE2E6" }}>
                  <tr>
                    <th>Sigla</th>
                    <th>Descrição</th>
                    <th>Período</th>
                    <th>Duração (hs)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.disciplinas.map(disciplinas => <tr><td width="6px">{disciplinas.tx_sigla}</td><td>{disciplinas.tx_descricao}</td><td>{disciplinas.in_periodo}</td><td>{disciplinas.in_carga_horaria}</td></tr>)}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        }
      </Container>
    )
  }
}

