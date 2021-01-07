import React from 'react';
import { useFetchNews } from './functions';
import Loader from '../../components/loader/Loader';
import NewsTile from '../../components/newsTile';
import { List, ListItem } from '@material-ui/core';
import styles from './styles.module.css';
import { trans } from '../../trans/trans';
import Pagination from '../../components/pagination';

export default function News({ onlyMostRecentNews }) {
  const [loading, news, currentPage, setCurrentPage, totalPages] = useFetchNews(
    onlyMostRecentNews,
  );

  const handlePaginationOnChange = (_, value) => {
    setCurrentPage(value);
  };
  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : news.length > 0 ? (
        <div className={onlyMostRecentNews ? '' : styles.resultsContainer}>
          <List className={styles.container}>
            {news.map((item) => (
              <ListItem key={item.id}>
                <NewsTile news={item} />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div className={styles.emptyResults}>
          <p>{trans('words.emptyResults')}</p>
        </div>
      )}
      {!onlyMostRecentNews && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePaginationOnChange}
        />
      )}
    </div>
  );
}
