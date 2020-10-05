const axios = require('axios');

exports.searchBook = async (req, res) => {
  const { query, page } = req.query;
  const url = `${process.env.ALADIN_API}Query=${encodeURIComponent(query)}&Start=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data) {
      res.status(200).send(data);
    } else {
      throw Error('Aladin error');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
