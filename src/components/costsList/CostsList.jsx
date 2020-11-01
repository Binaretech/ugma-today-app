import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import CardCost from '../../components/cardCost/CardCost';
import { useXhr } from '../../utils/xhr/hook';
import apiEndpoints from '../../apiEndpoints';
import { trans } from '../../trans/trans';
import styles from './CostsList.module.css';
import BigNumber from 'bignumber.js';

function CostsList() {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [scrollLoading, setScrollLoading] = useState(false);
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
				setResponse((oldRes) => ({
					...oldRes,
					...res,
					ids: [...oldRes?.ids, ...res?.ids],
					data: {
						...oldRes?.data,
						...res?.data,
					},
				}));
			})
			.catch(console.error)
			.finally(() => {
				setLoading(false);
				setScrollLoading(false);
			});
	}, [page]);

	const onScroll = (event) => {
		const { scrollHeight, scrollTop, clientHeight } = event.target;

		if (
			new BigNumber(scrollTop).plus(clientHeight).isEqualTo(scrollHeight) &&
			!loading &&
			response?.next_page_url
		) {
			setPage(response?.current_page + 1);
			setScrollLoading(true);
		}
	};

	return (
		<div className={styles.mainContainer} onScroll={onScroll}>
			{loading ? (
				<Loader />
			) : (
				<>
					{response?.ids?.length > 0 ? (
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
					{scrollLoading && <Loader />}
				</>
			)}
		</div>
	);
}

export default CostsList;
