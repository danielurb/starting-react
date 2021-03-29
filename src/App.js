import React from 'react';
import styled from '@emotion/styled';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from './components/PokemonFilter';
import PokemonTable from './components/PokemonTable';

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
	const [filter, filterSet] = React.useState('');
	const [pokemon, pokemonSet] = React.useState([]);
	const [selectedPokemon, selectedPokemonSet] = React.useState(null);

	React.useEffect(() => {
		// let host =
		// 	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		// 		? 'http://localhost:3000'
		// 		: '';

		// fetch(`${host}/starting-react/pokemon.json`)
		fetch(`/starting-react/pokemon.json`)
			.then(resp => resp.json())
			.then(data => pokemonSet(data));
	}, []);

	if (!pokemon) {
		return <div>Loading data</div>;
	}

	return (
		<PageContainer>
			<CssBaseline />
			<Title>Pokemon Search</Title>
			<TwoColumnLayout>
				<div>
					<PokemonFilter filter={filter} filterSet={filterSet} />
					<PokemonTable
						filter={filter}
						pokemon={pokemon}
						selectedPokemonSet={selectedPokemonSet}
					/>
				</div>
				{selectedPokemon && <PokemonInfo {...selectedPokemon} />}
			</TwoColumnLayout>
		</PageContainer>
	);
}

export default App;
