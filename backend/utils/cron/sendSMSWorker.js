import queryScheduledTexts from "../scheduledTexts/queryScheduledTexts.js";

const sendSMSWorker = () => {
  return {
    run() {
      queryScheduledTexts();
    },
  };
};

export default sendSMSWorker();