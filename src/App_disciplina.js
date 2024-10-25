/*
    Aluna: Rebeca M.C.T. Figueiredo
    Matricula: 2019012144
    Disciplina:Programação 3
    Prof.: Alex Paulo
    Turma: 2021.2
    PROVA 
*/


import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
//import Titulos from './Pages/Titulos';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Biblioteca https://www.npmjs.com/package/react-bs-datatable
import Datatable from 'react-bs-datatable' 

export default class App extends React.Component {
  state = {
    disciplinas: [],
    loading: true,
    //criando o cabeçalho da tabela title é a coluna e o props é o valor que retorna do backend
    header: [// Create table headers consisting of 4 columns.
        { title: 'Sigla', prop: 'tx_sigla' },
        { title: 'Descrição', prop: 'tx_descricao' },
        { title: 'Período', prop: 'in_periodo' },
        { title: 'Duração', prop: 'in_carga_horaria' }
      ]
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
              
              <Datatable tableHeaders={this.state.header} tableBody={this.state.disciplinas} rowsPerPage={5} 
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