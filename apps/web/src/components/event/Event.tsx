import { Description, Name } from '@game/entities/shared';
import { useCurrentEntity, useSystem } from '@javelin/react';
import React, { useState } from 'react';

export const Event: React.FC = () => {
	const entity = useCurrentEntity();
	const [{ name, description }, setValue] = useState({ name: '', description: '' });

	useSystem(world => {
		try {
			const nameValue = world.get(entity, Name);
			const descriptionValue = world.get(entity, Description);
			if (nameValue && descriptionValue && (nameValue !== name || descriptionValue !== description)) {
				setValue({ name: nameValue, description: descriptionValue });
			}
		} catch (error) {}
	});

	return (
		<div>
			EVENT {name} | {description}
		</div>
	);
};
