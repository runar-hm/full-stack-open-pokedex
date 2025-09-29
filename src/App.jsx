import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { useApi } from './useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import PokemonPage from './PokemonPage';
import PokemonList from './PokemonList';

const mapResults = ({ results }) =>
  results.map(({ url, name }) => ({
    url,
    name,
    id: parseInt(url.match(/\/(\d+)\//)[1]),
  }));

const App = () => {
  const match = useMatch('/pokemon/:name');
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=50', mapResults);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  let next = null;
  let previous = null;

  if (match && match.params) {
    const pokemonId = pokemonList.find(
      ({ name }) => name === match.params.name
    ).id;

    const idx = pokemonList.findIndex(({ id }) => id === pokemonId);

    const next_idx = idx < pokemonList.length - 1 ? idx + 1 : 1;
    const prev_idx = idx > 0 ? idx - 1 : pokemonList.length - 1;

    previous = pokemonList.find(({ id }) => id === pokemonList[prev_idx].id);
    next = pokemonList.find(({ id }) => id === pokemonList[next_idx].id);
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<PokemonList pokemonList={pokemonList} />}
      />
      <Route
        exact
        path="/pokemon/:name"
        element={
          <PokemonPage
            pokemonList={pokemonList}
            previous={previous}
            next={next}
          />
        }
      />
    </Routes>
  );
};

export default App;
