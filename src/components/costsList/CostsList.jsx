import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import CardCost from '../../components/cardCost/CardCost';
import { useXhr } from '../../utils/xhr/hook';
import apiEndpoints from '../../apiEndpoints';
import { trans } from '../../trans/trans';
import styles from './CostsList.module.css';

function CostsList() {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState({
		ids: [],
		data: {},
	});

	const [send] = useXhr({
		method: 'GET',
		url: apiEndpoints.createCost + `?page=${page}`,
	});

	useEffect(() => {
		send()
			.then((res) => {
				setResponse({
					...response,
					...res,
					ids: [...response?.ids, ...res?.ids],
					data: {
						...response?.data,
						...res?.data,
					},
				});
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [page]);

	return (
		<div className={styles.mainContainer}>
			{loading ? (
				<Loader />
			) : response?.ids?.length > 0 ? (
				response?.ids?.map((id) => {
					const cost = response?.data[id];
					return (
						<CardCost
							id={id}
							name={cost?.name}
							price={cost?.price}
							comment={cost?.comment}
							currencyName={cost?.currencyName}
							key={id}
						/>
					);
				})
			) : (
				<div className={styles.emptyResults}>
					<p>{trans('Components.costsList.emptyResults')}</p>
				</div>
			)}
		</div>
	);
}

export default CostsList;
