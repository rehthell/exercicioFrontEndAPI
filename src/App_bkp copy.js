/*
    Aluna: Rebeca M.C.T. Figueiredo
    Matricula: 2019012144
    Disciplina:Programação 3
    Prof.: Alex Paulo
    Turma: 2021.2
    PROVA 
*/


import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
//import Titulos from './Pages/Titulos';
import { Container, Spinner, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Biblioteca https://www.npmjs.com/package/react-bs-datatable
import Datatable from 'react-bs-datatable'

export default class App extends React.Component {
  state = {
    titulos: [],
    loading: true,
    //criando o cabeçalho da tabela title é a coluna e o props é o valor que retorna do backend
    header: [// Create table headers consisting of 4 columns.
      { title: 'Id', prop: 'id' },
      { title: 'Descrição', prop: 'tx_descricao' },
    ]
  }
  //roda quando a tela é criada Requisição da APIna porta 3004
  componentDidMount() {
    axios.get(`http://localhost:3004/titulo/`)
      .then(res => {
        const titulos = res.data;
        this.setState({ titulos, loading: false });
      })
  }
  
    cadastrar() {
    }   
    

render() {
  const mystyle = {
    border: "none",
    width: "50%"
  };
  return (
    <Container fluid="md" className="justify-content-md-center">
      <Card style={mystyle} className="text-left">
        <Card.Body>
          <Card.Title>FORMULARIO DE TITULO</Card.Title>
          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="Informe a descrição do titulo" id="input_descricao"/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => this.cadastrar()}>
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>


      {this.state.loading ? <Button variant="primary" disabled>
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
            <Card.Title>TITULOS</Card.Title>

            <Datatable tableHeaders={this.state.header} tableBody={this.state.titulos} rowsPerPage={5}
              rowsPerPageOption={[5, 10, 15, 20]}></Datatable>

          </Card.Body>
        </Card>
      }
    </Container>
  )
}
}
// componente da tabela customizado com pagination
// tableheader: cabeçalho da tabela: array de objetos
// tablebody: corpo da tabela: dados que retornam do backend | array de objetos
// rowsperpages: quantas linhas serão exibidas por página na tabela | int
// rowsperpagesoption: opções de seleção de exibição de linhas por página | array de objeto
