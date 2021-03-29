import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { Button, CssBaseline } from '@material-ui/core';

import './App.css';

const PokemonType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.shape({
		english: PropTypes.string.isRequired,
		japanese: PropTypes.string.isRequired,
		chinese: PropTypes.string.isRequired,
		french: PropTypes.string.isRequired
	}),
	type: PropTypes.arrayOf(PropTypes.string.isRequired),
	base: PropTypes.shape({
		HP: PropTypes.number.isRequired,
		Attack: PropTypes.number.isRequired,
		Defense: PropTypes.number.isRequired,
		'Sp. Attack': PropTypes.number.isRequired,
		'Sp. Defense': PropTypes.number.isRequired,
		Speed: PropTypes.number.isRequired
	})
});

const PokemonRow = ({ pokemon, onSelect }) => (
	<tr>
		<td>{pokemon.name.english}</td>
		<td>{pokemon.type.join(', ')}</td>
		<td>
			<Button variant='contained' color='primary' onClick={() => onSelect(pokemon)}>
				Select!
			</Button>
		</td>
	</tr>
);

PokemonRow.propTypes = {
	pokemon: PokemonType,
	onSelect: PropTypes.func.isRequired
};

const PokemonInfo = ({ name: { english }, base }) => (
	<div>
		<h1>{english}</h1>
		<table>
			<tbody>
				{Object.keys(base).map(key => (
					<tr key={key}>
						<td>{key}</td>
						<td>{base[key]}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

PokemonInfo.propTypes = { pokemon: PokemonType };

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
const Input = styled.input`
	width: 100%;
	padding: 0.2rem;
	font-size: large;
`;

function App() {
	const [filter, filterSet] = React.useState('');
	const [pokemon, pokemonSet] = React.useState([]);
	const [selectedItem, selectedItemSet] = React.useState(null);

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
					<Input value={filter} onChange={evt => filterSet(evt.target.value)} />
					<table width='100%'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{pokemon
								.filter(pokenmon =>
									pokenmon.name.english.toLowerCase().includes(filter.toLowerCase())
								)
								.slice(0, 20)
								.map(pokemon => (
									<PokemonRow
										pokemon={pokemon}
										key={pokemon.id}
										onSelect={pokemon => selectedItemSet(pokemon)}></PokemonRow>
								))}
						</tbody>
					</table>
				</div>
				{selectedItem && <PokemonInfo {...selectedItem} />}
			</TwoColumnLayout>
		</PageContainer>
	);
}

export default App;
