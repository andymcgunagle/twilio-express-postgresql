import cron from 'cron';
import sendSMSWorker from './sendSMSWorker.js';

const cronJob = cron.CronJob;

const cronJobs = () => {
  return {
    start() {
      new cronJob('00 * * * * *', () => {
        const time = new Date();
        console.log(`\n⏰ cronJobs running sendSMSWorker for ${time}`);
        sendSMSWorker.run();
      }, null, true, '');
    },
  };
};

export default cronJobs();