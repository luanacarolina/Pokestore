import React, { useEffect, useState } from "react";
import { allPokemon } from "./services/api";
import Header from "./components/Header";
import * as S from "./styled";
import Card from "./components/Card";
import ShoppingCart from './components/ShoppingCart'
import Modal from './components/Modal'
import ScrollTop from './components/ScrollTop'

import "./style.css";
import { Container, Button } from "react-bootstrap";

export default function App() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [pokemonCart, setPokemonCart] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const [showModalState, setShowModalState] = useState(false);  
  const limit = 12;

  useEffect(() => {
    loadPokemon(limit, offset);
  }, []);

  return (
    <Container>
      <Header pokemonSearchName={(pokemon) => {
        setOffset(0)
        setPokemonArray([pokemon])}}
      />
      <S.divMap>
        <S.divCards>
          {renderCards(pokemonArray)}
        </S.divCards>
       
        <ShoppingCart 
          removeStatePokemon={(pokemon, price) => removeStatePokemon(pokemon, price)}
          pokemonCart={savedPokemonCart()}
          endShop={() => endShop()} 
          totalPrice={savedTotalPrice()} 
        />
      </S.divMap>

      <S.divButton>
        <Button onClick={() => loadPokemon(limit, offset)}>VER MAIS </Button>
      </S.divButton>

      <ScrollTop />
      {isShowModal()}
    </Container>
  );

  async function loadPokemon(limit, offset) {
    setOffset(offset + 10);
    let response = await allPokemon(limit, offset).then(
      (result) => result.results
    );
    setPokemonArray(pokemonArray.concat(response));
  }

  function renderCards(pokemon) {
    return pokemon.map((pokemonCurrent, index) => {
      return <Card pokemonCart={(pokemon) => { 
        sumPriceTotal(pokemon.order)
        savePokemon(pokemon)    
    }} 
        pokemon={pokemonCurrent} key={index} />;
    });
  }

  function isShowModal() {
    if (showModalState === true)
      return (<Modal hideModal={() => {setShowModalState(false)}}/>);
  }

  function endShop() {
    localStorage.clear()
    setPokemonCart([])
    setTotalPrice(0);
    
    setShowModalState(true)
  }

  function sumPriceTotal(value){
    localStorage.setItem('totalPrice', (parseInt(totalPrice) + value))
    setTotalPrice(savedTotalPrice())
  }

  function subTotalPrice(value){
    localStorage.setItem('totalPrice', savedTotalPrice() - value)
    setTotalPrice(savedTotalPrice())
  }

  function savedTotalPrice(){
    return localStorage.getItem('totalPrice') 

  }

  function savePokemon(pokemon){
    const savedLocalPokemon = savedPokemonCart() || []
    localStorage.setItem('pokemons', JSON.stringify(savedLocalPokemon.concat(pokemon)))
    setPokemonCart(savedPokemonCart())
  }

  function savedPokemonCart(){
    return  JSON.parse(localStorage.getItem('pokemons'))
  }

  function removeStatePokemon(pokemon, price){
    
    localStorage.setItem('pokemons', JSON.stringify(pokemon))
    subTotalPrice(price)
  }

}
