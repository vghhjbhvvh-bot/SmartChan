const axios = require('axios');
const groq = require('groq');

const getVoteCount = async (chatId) => {
  const response = await axios.get(`https://api.groq.io/v1/channels/${chatId}/votes`);
  return response.data.count;
};

module.exports = { getVoteCount };