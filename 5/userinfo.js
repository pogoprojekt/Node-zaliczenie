const axios = require('axios');

module.exports = getdataFromGitHubURL = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    const response = await axios.get(url);
    return response.data;
  }
