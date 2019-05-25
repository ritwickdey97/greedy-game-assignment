import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { Container, FormGroup, Label } from 'reactstrap';

import styles from './dashboard.module.css';
import { GameStatService } from '../../service/GameStatService';
import { DrawCPMChart } from '../DrawCPMChart';
import StatTable from '../StatTable';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(
    new moment().subtract(365, 'days')
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new moment());
  const [focusedDateRange, setFocusedDateRange] = useState(null);

  const [stats, setStats] = useState(null);
  const [filteredStats, setFilteredStats] = useState(null);

  useEffect(() => {
    const timeoutInMs = 200;
    const slowNetwork = setTimeout(() => {
      toast.info(`Slow! request is not completed within ${timeoutInMs}ms`);
    }, timeoutInMs);

    GameStatService.getStats()
      .then(stats => {
        setStats(stats);
      })
      .finally(() => {
        clearTimeout(slowNetwork);
      });
  }, []);

  useEffect(() => {
    if (!stats) {
      return;
    }

    const _stats = stats.filter(stat =>
      stat._momentTime.isBetween(selectedStartDate, selectedEndDate)
    );

    setFilteredStats(_stats || []);
  }, [stats, selectedStartDate, selectedEndDate]);

  if (filteredStats === null) {
    return (
      <div className="fullScreenSpinner">
        <ClipLoader size={150} />
      </div>
    );
  }

  return (
    <Container className={styles.dashbaord}>
      <h2 className={styles.header}>Game Stats</h2>
      <div>
        <FormGroup>
          <Label>Select Date Range</Label>
          <div>
            <DateRangePicker
              displayFormat={'DD/MM/YYYY'}
              numberOfMonths={1}
              startDate={selectedStartDate}
              isOutsideRange={() => false}
              isDayBlocked={date => date.valueOf() > Date.now()}
              startDateId="game_date_range_start_date"
              endDate={selectedEndDate}
              endDateId="game_date_range_end_date"
              onDatesChange={({ startDate, endDate }) => {
                setSelectedStartDate(startDate);
                setSelectedEndDate(endDate);
              }}
              focusedInput={focusedDateRange}
              onFocusChange={focusedInput => setFocusedDateRange(focusedInput)}
            />
          </div>
        </FormGroup>
      </div>
      <div className={styles.section}>
        <h4>Stats Charts</h4>
        <DrawCPMChart stats={filteredStats} />
      </div>
      <div className={styles.section}>
        <h4>Stats Table</h4>
        <StatTable stats={filteredStats} />
      </div>
    </Container>
  );
};

export default Dashboard;
