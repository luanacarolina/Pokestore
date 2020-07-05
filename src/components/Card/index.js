import React, { useEffect, useState } from "react";
import { specficPokemon } from '../../services/api'
import { Button, CardDeck } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';


import { Card } from 'react-bootstrap';


export default function Cards({pokemon, pokemonCart}) {

    const [currentPokemon, setCurrentPokemon] = useState([])

    useEffect(() => {
        async function loadPokemon() {
                const {id, name, order} =  await specficPokemon(pokemon.name).then(result => result)
                setCurrentPokemon({id,
                    name,
                    order, 
                    image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`})
        }
            loadPokemon()
    }, [pokemon])
    
    return (   
        <CardDeck style={{ margin: '18px' }}>
            <Card style={{ width: '10rem' }}>
  <Card.Img variant="top"  src={currentPokemon.image} alt="Avatar" style={{width:'20%'}} />
  <Card.Body>
    <Card.Title>R${currentPokemon.order}</Card.Title>
    <Card.Text>
    {currentPokemon.name}
    </Card.Text>
    <Button variant="primary" onClick={() => pokemonCart(currentPokemon)}>Adicionar</Button>
  </Card.Body>
</Card>
</CardDeck>
  
    );
  
  }
  