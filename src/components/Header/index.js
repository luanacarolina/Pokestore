import React, { useState } from "react";
import { specficPokemon } from '../../services/api'

import { Col } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

export default function Header({pokemonSearchName}) {
  const [pokemonName, setPokemonName] = useState('');

  async function handlePesquisa(){
    if(pokemonName){
      const response = await specficPokemon(pokemonName.toLowerCase()).then(response => response)
      pokemonSearchName(response)
    }
  }
  return (
          <Container >
          <Row>
          <Col sm="12">
          <Navbar bg="light" expand="lg">

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Navbar.Brand href="#home">Pokestore</Navbar.Brand>
      </Nav>
      <Form inline>
        <FormControl value={pokemonName} onChange={e => setPokemonName(e.target.value)} placeholder="Pesquise pelo nome" className="mr-sm-2" />
        <Button onClick={handlePesquisa} variant="outline-success">Search</Button>
      </Form>
      </Navbar.Collapse>
      </Navbar>
      </Col>
          </Row>
          </Container>

  );
}
