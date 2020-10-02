const axios = require('axios');

exports.searchBook = async (req, res) => {
  const { searchQuery } = req.query;
  const url = `${process.env.ALADIN_API}${encodeURIComponent(searchQuery)}`;

  try {
    const { data } = await axios.get(url);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
