const AccessService = require("../db/access.service");
const logger = require("../utils/logger.js");

exports.getUrlWiseApp = async (req, res) => {
  logger.log(
    "info",
    "PATH -------------- /access/get-app-urlwise  ---------------"
  );
  const { baseUrl } = req.body;
  const result = await AccessService.getUrlWiseApp(baseUrl);
  if (result.error) {
    logger.log("error", result.errorMessage);
    return res.status(400).json({
      ...result,
    });
  }

  logger.log("info", "get URL Wise App success");
  res.status(200).json({
    ...result,
  });
};

exports.getAppIdWiseApp = async (req, res) => {
  logger.log(
    "info",
    "PATH -------------- /access/get-app-details ---------------"
  );
  const { appId } = req.body;
  const result = await AccessService.getAppIdWiseApp(appId);
  if (result.error) {
    logger.log("error", result.errorMessage);
    return res.status(400).json({
      ...result,
    });
  }

  logger.log("info", "get App Id Wise App success");
  res.status(200).json({
    ...result,
  });
};

exports.getAppWiseMenus = async (req, res) => {
  logger.log("info", "PATH -------------- /get-menu-appwise  ---------------");
  const { userId, appId } = req.body;
  const result = await AccessService.getAppWiseMenus(userId, appId);
  if (result.error) {
    logger.log("error", result.errorMessage);
    return res.status(400).json({
      ...result,
    });
  }

  logger.log("info", "get App Id Wise Menus success");
  res.status(200).json({
    ...result,
  });
};
