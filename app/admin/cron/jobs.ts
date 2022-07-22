import cron from 'node-cron';
import { reset } from './reset';

const cronOptions: cron.ScheduleOptions = {
  timezone: 'Australia/Melbourne',
  scheduled: false,
};

// run reset every...
// export const resetScheduledJob = cron.schedule('0 * * * *', reset, cronOptions);