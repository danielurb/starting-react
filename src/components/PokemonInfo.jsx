import React, { useContext } from 'react';
import PokemonContext from '../PokemonContex';
import PokemonType from '../PokemonType';

const PokemonInfo = () => {
	const { selectedPokemon } = useContext(PokemonContext);

	return selectedPokemon ? (
		<div>
			<h1>{selectedPokemon.name.english}</h1>
			<table>
				<tbody>
					{Object.keys(selectedPokemon.base).map(key => (
						<tr key={key}>
							<td>{key}</td>
							<td>{selectedPokemon.base[key]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : null;
};

PokemonInfo.propTypes = { pokemon: PokemonType };

export default PokemonInfo;
