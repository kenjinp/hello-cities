import { useQueries } from '@tanstack/react-query';
import React from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { addAssetsToStore } from 'src/state/state';
import { match } from 'ts-pattern';
import YAML from 'yamljs';

export interface LoadAssetsProps {
	loading?: React.ReactElement;
	success?: React.ReactElement;
	error?: React.ReactElement;
}

export function LoadAssets({ loading, success, error }: LoadAssetsProps) {
	const ref = React.useRef<LoadingBarRef>(null);

	const [cardsQuery, deckQuery] = useQueries({
		queries: [
			{
				queryKey: ['cards', 1],
				queryFn: () =>
					fetch('/data/cards.yml')
						.then(res => res.text())
						.then(body => YAML.parse(body)),
				staleTime: Infinity
			},
			{
				queryKey: ['decks', 2],
				queryFn: () =>
					fetch('/data/decks.yml')
						.then(res => res.text())
						.then(body => YAML.parse(body)),
				staleTime: Infinity
			}
		]
	});

	console.log(cardsQuery, deckQuery);

	React.useEffect(() => {
		match({
			loading: cardsQuery.isLoading || deckQuery.isLoading,
			error: cardsQuery.isError || deckQuery.isError,
			success: cardsQuery.isSuccess && deckQuery.isSuccess
		})
			.with(
				{
					loading: true
				},
				() => {
					ref.current?.continuousStart();
				}
			)
			.with(
				{
					error: true
				},
				() => {
					ref.current?.complete();
				}
			)
			.with(
				{
					success: true
				},
				() => {
					addAssetsToStore({
						cards: cardsQuery.data,
						decks: deckQuery.data
					});
					ref.current?.complete();
				}
			)
			.run();
	}, [cardsQuery, cardsQuery]);

	return (
		<>
			<LoadingBar color={'#f5c247'} ref={ref} />
			{match({
				loading: cardsQuery.isLoading || deckQuery.isLoading,
				error: cardsQuery.isError || deckQuery.isError,
				success: cardsQuery.isSuccess && deckQuery.isSuccess
			})
				.with(
					{
						loading: true
					},
					() => {
						return loading && <>{loading}</>;
					}
				)
				.with(
					{
						error: true
					},
					() => {
						return error && <>{error}</>;
					}
				)
				.with(
					{
						success: true
					},
					() => {
						return success && <>{success}</>;
					}
				)
				.run()}
		</>
	);
}
