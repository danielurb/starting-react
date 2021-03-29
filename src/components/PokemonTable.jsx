import React, { useContext } from 'react';
import PokemonContext from '../PokemonContex';
import PokemonRow from './PokemonRow';

const PokemonTable = () => {
	const { pokemon, filter, selectedPokemonSet } = useContext(PokemonContext);

	return (
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
							onSelect={pokemon => selectedPokemonSet(pokemon)}></PokemonRow>
					))}
			</tbody>
		</table>
	);
};

export default PokemonTable;
