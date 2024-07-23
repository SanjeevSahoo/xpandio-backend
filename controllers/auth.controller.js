const jwtGenerator = require("../utils/jwt");

const logger = require("../utils/logger.js");
const { decryptData, encryptData } = require("../utils/crypto.js");

const AuthService = require("../db/auth.service");

exports.refreshToken = async (req, res) => {
  logger.log("info", "PATH -------------- /refreshtoken  ---------------");
  const { token } = req.body;
  if (!token) {
    return res.status(401).send({
      errorMessage: "Invalid Token",
      errorTransKey: "api_res_invalid_token",
    });
  }

  try {
    const verifiedWithoutExpiry = jwtGenerator.vertifyAccessToken(token, true);
    if (
      !verifiedWithoutExpiry ||
      !verifiedWithoutExpiry.ID ||
      !verifiedWithoutExpiry.exp
    ) {
      return res.status(401).send({
        errorMessage: "Invalid Token",
        errorTransKey: "api_res_invalid_token",
      });
    }

    const userDetails = {
      _id: verifiedWithoutExpiry._id,
      name: verifiedWithoutExpiry.name,
      email: verifiedWithoutExpiry.email,
      emp_id: verifiedWithoutExpiry.emp_id,
      designation: verifiedWithoutExpiry.designation,
    };

    const jsontoken = jwtGenerator.generateAccessToken(userDetails);

    res.status(200).send({ AUTH_TOKEN: jsontoken });
  } catch (err) {
    console.log(err);
    logger.log("error", `Refresh Token ${JSON.stringify(err)}`);
    return res.status(401).send({
      errorMessage: "Invalid Token",
      errorTransKey: "api_res_invalid_token",
    });
  }
};

exports.login = async (req, res) => {
  logger.log("info", "PATH -------------- /login  ---------------");
  const { domainId, domainPassword } = req.body;

  const decDomainId = decryptData(domainId);
  const decDomainPassword = decryptData(domainPassword);

  if (!decDomainId || decDomainId.length <= 0) {
    return res.status(400).json({
      errorMessage: "Domain Id cannot be blank. Try again.",
      errorTransKey: "api_res_domainid_blank",
    });
  }

  if (!decDomainPassword || decDomainPassword.length <= 0) {
    return res.status(400).json({
      errorMessage: "Domain Password cannot be blank. Try again.",
      errorTransKey: "api_res_password_blank",
    });
  }

  const retVal = await AuthService.authenticateUser(
    decDomainId,
    decDomainPassword
  );

  if (retVal.error) {
    return res.status(400).json({
      errorMessage: retVal.errorMessage,
      errorTransKey: "api_res_invalid_credentials",
    });
  }

  const userDetails = retVal.data;

  const jsontoken = jwtGenerator.generateAccessToken(userDetails);
  const encryptUserData = encryptData(JSON.stringify(userDetails));

  logger.log("info", "Login Successfull");
  res.status(200).json({ userData: encryptUserData, authToken: jsontoken });
};
