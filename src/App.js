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
import axios from 'axios';
//import Titulos from './Pages/Titulos';
import { Container, Spinner, Card, Button, Form, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titulos: [],
      loading: true,
      //criando o cabeçalho da tabela title é a coluna e o props é o valor que retorna do backend
      header: [// Create table headers consisting of 4 columns.
        { title: 'Id', prop: 'id' },
        { title: 'Descrição', prop: 'tx_descricao' },
        { title: 'Ações', prop: '' },
      ],
      desctitulo: '',
      exibirAlert: false
    };
  }
 
  
  //roda quando a tela é criada Requisição da APIna porta 3004
  componentDidMount() {
    axios.get(`http://localhost:3004/titulo/`)
      .then(res => {
        const titulos = res.data;
        this.setState({ titulos, loading: false });
      });
  }

  handleChange(event) {    
    this.setState({desctitulo: event.target.value});  
  }
  
    cadastrar() {
      var descricao = document.getElementById("input_descricao").value.trim();
      if(descricao === "")
      {
        alert("Descrição é obrigatória!");
      }
      else{
        axios.post('http://localhost:3004/titulo/', {
          descricao
        })
        .then(function (response) {
          console.log(response);
          this.setState({ exibirAlert: true });
        })
        .catch(function (error) {
          console.log(error);
        });
     }
    }   

    editarItem(id, descricao) {
      document.getElementById("input_id").value = id;
      document.getElementById("input_descricao").value = descricao; 
      document.getElementById("btncadastrar").style.display = 'none';
      document.getElementById("btneditar").style.display = 'inline';      
      document.getElementById("btncancelar").style.display = 'inline';
      document.getElementById("input_descricao").focus(); 
    } 

    cancelar(){      
      document.getElementById("input_id").value = "";
      document.getElementById("input_descricao").value = ""; 
      document.getElementById("btncadastrar").style.display = 'inline';
      document.getElementById("btneditar").style.display = 'none';
      document.getElementById("btncancelar").style.display = 'none';
    }

    editar(){
      var id = document.getElementById("input_id").value;
      var descricao = document.getElementById("input_descricao").value;
      if(descricao === "")
      {
        alert("Descrição é obrigatória!");
      }
      else{
        axios({
          method: 'put',
          url: 'http://localhost:3004/titulo/'+ id,
          data: {
            descricao
          }
        }).then(function (response) {
          console.log(response);
          this.setState({ exibirAlert: true });
        })
        .catch(function (error) {
          console.log(error);
        });
     }
    }

    excluir(id) {
        axios({
          method: 'delete',
          url: 'http://localhost:3004/titulo/'+ id
        }).then(function (response) {
          console.log(response);
          this.setState({ exibirAlert: true });
        })
        .catch(function (error) {
          console.log(error);
        });     
    } 

render() {
    const mystyle = {
      border: "none",
      width: "50%"
    };
    const ocultar = {
      display: "none"
    }
    return (

      <Container fluid="md" className="justify-content-md-center">
        <Card style={mystyle} className="text-left">
          <Card.Body>
            <Card.Title>FORMULARIO DE TITULO</Card.Title>  
            {this.state.exibirAlert ? <Alert variant="success">Solicitação realizada com sucesso!</Alert> : <p></p>}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" placeholder="Id" id="input_id" readOnly/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" placeholder="Informe a descrição do titulo" id="input_descricao"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={() => this.cadastrar()} id="btncadastrar">
                Cadastrar
              </Button>
              <Button variant="primary" type="submit" onClick={() => this.editar()} style={ocultar} id="btneditar">
                Editar
              </Button>
              <Button variant="secondary" type="button" onClick={() => this.cancelar()} style={ocultar} id="btncancelar">
                Cancelar
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

                <Table striped bordered hover>
                  <thead>
                    <tr>                      
                      <th>Id</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>                    
                      { this.state.titulos.map(titulos =>
                        <tr>
                          <td>{titulos.id}</td>
                          <td>{titulos.tx_descricao}</td>
                          <td>
                          <Button variant="primary" onClick={() => this.editarItem(titulos.id, titulos.tx_descricao)}>Editar</Button>{' '}
                          <Button variant="danger" onClick={() => this.excluir(titulos.id)}>Excluir</Button>{' '}
                          </td>
                        </tr>
                      )}                                       
                  </tbody>
                </Table>

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
