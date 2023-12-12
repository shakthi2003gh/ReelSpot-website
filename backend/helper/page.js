const { Page } = require("../models/page");

exports.getPageID = async function () {
  const page = await Page.find();
  return page[0]._id;
};
