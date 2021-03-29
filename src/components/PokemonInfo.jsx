import React from 'react';
import PokemonType from '../PokemonType';

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

export default PokemonInfo;
