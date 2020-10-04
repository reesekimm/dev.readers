const axios = require('axios');

exports.searchBook = async (req, res) => {
  const { query, page } = req.query;
  const url = `${process.env.ALADIN_API}Query=${encodeURIComponent(query)}&Start=${page}`;

  try {
    const { data } = await axios.get(url);

    /** 올바른 JSON 포맷으로 변환하는 작업 진행
     * 1. `slice()` : JSON 끝에 붙어있는 세미콜론 제거
     * 2. `replace()` : JSON 내부 홑따옴표(')를 쌍따옴표(")로 변경
     *
     * e.g)
     * { "description" : \'기본기 다지기\', ... }; -> { "description" : "기본기 다지기", ... }
     */
    const processedJSON = data.slice(0, -1).replace(/\'/g, '"');
    res.status(200).json(processedJSON);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
