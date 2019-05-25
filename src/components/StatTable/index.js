//@ts-check
import React from 'react';
import ReactTable from 'react-table';

const columns = [
  {
    id: 'timestamp',
    Header: 'Timestamp',
    accessor: d => d._momentTime.format('YYYY-MM-DD'),
    sortMethod: (a, b) => {
      return new Date(a).getTime() > new Date(b).getTime() ? 1 : -1;
    }
  },
  {
    Header: 'Game',
    accessor: 'game'
  },
  {
    Header: 'Revenue',
    accessor: 'revenue'
  },
  {
    Header: 'Impressions',
    accessor: 'impressions'
  },
  {
    id: 'eCPM',
    Header: 'eCPM',
    accessor: d => d.getECPM()
  }
];

/**
 *
 * @param { {stats: import('../../model/GameStat').GameStat[]} } props
 */
const StatTable = props => {
  return (
    <ReactTable
      noDataText={'No Matched Data'}
      minRows={1}
      defaultPageSize={5}
      pageSizeOptions={[5, 10]}
      data={props.stats || []}
      columns={columns}
      defaultSorted={[{ id: 'timestamp', desc: false }]}
    />
  );
};

export default StatTable;
