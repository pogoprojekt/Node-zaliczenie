const axios = require('axios');

module.exports = getrepoFromGitHubURL = async (user) => {
    const url = `https://api.github.com/users/${user}/repos`;
    const response = await axios.get(url);
    return response.data;
  }