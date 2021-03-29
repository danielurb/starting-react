import React from 'react';
import styled from '@emotion/styled';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from './components/PokemonFilter';
import PokemonTable from './components/PokemonTable';

import PokemonContex from './PokemonContex';

const pokemonReducer = (state, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return {
				...state,
				filter: action.payload
			};
		case 'SET_POKEMON':
			return {
				...state,
				pokemon: action.payload
			};
		case 'SET_SELECTED_POKEMON':
			return {
				...state,
				selectedPokemon: action.payload
			};
		default:
			throw new Error('No action');
	}
};

const Title = styled.h1`
	text-align: center;
`;
const PageContainer = styled.div`
	margin: auto;
	width: 800px;
	padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 80% 20%;
	grid-column-gap: 1rem;
`;

function App() {
	// const [filter, filterSet] = React.useState('');
	// const [pokemon, pokemonSet] = React.useState([]);
	// const [selectedPokemon, selectedPokemonSet] = React.useState(null);
	const [state, dispatch] = React.useReducer(pokemonReducer, {
		pokemon: [],
		filter: '',
		selectedPokemon: null
	});

	React.useEffect(() => {
		fetch(`/starting-react/pokemon.json`)
			.then(resp => resp.json())
			.then(data =>
				dispatch({
					type: 'SET_POKEMON',
					payload: data
				})
			);
	}, []);

	if (!state.pokemon) {
		return <div>Loading data</div>;
	}

	return (
		<PokemonContex.Provider
			value={{
				// filter,
				// pokemon,
				// selectedPokemon,
				// filterSet,
				// pokemonSet,
				// selectedPokemonSet,
				state,
				dispatch
			}}>
			<PageContainer>
				<CssBaseline />
				<Title>Pokemon Search</Title>
				<TwoColumnLayout>
					<div>
						<PokemonFilter />
						<PokemonTable />
					</div>
					<PokemonInfo />
				</TwoColumnLayout>
			</PageContainer>
		</PokemonContex.Provider>
	);
}

export default App;
