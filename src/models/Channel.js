class Channel {
  constructor(chatId) {
    this.chatId = chatId;
  }

  async getVoteCount() {
    const response = await axios.get(`https://api.groq.io/v1/channels/${this.chatId}/votes`);
    return response.data.count;
  }
}

module.exports = Channel;