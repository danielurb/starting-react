import React, { useContext } from 'react';
import styled from '@emotion/styled';

import PokemonContex from '../PokemonContex';

const Input = styled.input`
	width: 100%;
	padding: 0.2rem;
	font-size: large;
`;

const PokemonFilter = () => {
	const {
		state: { filter },
		dispatch
	} = useContext(PokemonContex);

	return (
		<Input
			type='text'
			value={filter}
			onChange={evt =>
				dispatch({
					type: 'SET_FILTER',
					payload: evt.target.value
				})
			}
		/>
	);
};

export default PokemonFilter;
