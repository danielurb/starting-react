import PropTypes from 'prop-types';
import React from 'react';

import './App.css';

const PokemonRow = ({ pokemon, onSelect }) => (
	<tr>
		<td>{pokemon.name.english}</td>
		<td>{pokemon.type.join(', ')}</td>
		<td>
			<button onClick={() => onSelect(pokemon)}>Select!</button>
		</td>
	</tr>
);

PokemonRow.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.shape({
			english: PropTypes.string.isRequired
		}),
		type: PropTypes.arrayOf(PropTypes.string.isRequired)
	}),
	onSelect: PropTypes.func.isRequired
};

const PokemonInfo = ({ name, base }) => (
	<div>
		<h1>{name.english}</h1>
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

PokemonInfo.propTypes = {
	name: PropTypes.shape({
		english: PropTypes.string.isRequired
	}),
	base: PropTypes.shape({
		HP: PropTypes.number.isRequired,
		Attack: PropTypes.number.isRequired,
		Defense: PropTypes.number.isRequired,
		'Sp. Attack': PropTypes.number.isRequired,
		'Sp. Defense': PropTypes.number.isRequired,
		Speed: PropTypes.number.isRequired
	})
};

function App() {
	const [filter, filterSet] = React.useState('');
	const [pokemon, pokemonSet] = React.useState([]);
	const [selectedItem, selectedItemSet] = React.useState(null);

	React.useEffect(() => {
		fetch('http://localhost:3000/starting-react/pokemon.json')
			.then(resp => resp.json())
			.then(data => pokemonSet(data));
	}, []);

	return (
		<div
			style={{
				margin: 'auto',
				width: 800,
				paddingTop: '1rem'
			}}>
			<h1 className='title'>Pokemon Search</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '70% 30%',
					girdColumnGap: '1rem'
				}}>
				<div>
					<input value={filter} onChange={evt => filterSet(evt.target.value)} />
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
			</div>
		</div>
	);
}

export default App;
