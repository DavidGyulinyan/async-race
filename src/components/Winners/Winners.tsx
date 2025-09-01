import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchWinners, setPage, setSort } from '../../store/slices/winnersSlice';
import { SortBy, SortOrder } from '../../types';

const Winners: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { winners, currentPage, totalCount, sortBy, sortOrder } = useSelector((state: RootState) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners({ page: currentPage, sortBy, sortOrder }));
  }, [dispatch, currentPage, sortBy, sortOrder]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSortChange = (newSortBy: SortBy) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    dispatch(setSort({ sortBy: newSortBy, sortOrder: newSortOrder }));
  };

  return (
    <div className="winners">
      <h1>Winners</h1>
      <div className="sort-controls">
        <button onClick={() => handleSortChange('id')}>Sort by ID {sortBy === 'id' && (sortOrder === 'ASC' ? '↑' : '↓')}</button>
        <button onClick={() => handleSortChange('wins')}>Sort by Wins {sortBy === 'wins' && (sortOrder === 'ASC' ? '↑' : '↓')}</button>
        <button onClick={() => handleSortChange('time')}>Sort by Time {sortBy === 'time' && (sortOrder === 'ASC' ? '↑' : '↓')}</button>
      </div>
      <div className="winners-list">
        {winners.map((winner) => (
          <div key={winner.id} className="winner-item">
            <span>ID: {winner.id}</span>
            <span>Wins: {winner.wins}</span>
            <span>Time: {winner.time}s</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * 10 >= totalCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Winners;
