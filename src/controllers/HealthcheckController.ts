import Express, { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const HealthcheckController = Express.Router();

const healthcheckHandler: RequestHandler = async (req, res) => {
	// return res.sendStatus(StatusCodes.OK);
	return res.status(StatusCodes.OK).json({ status: "ok" });

}

// ✅ Note: we use "/" instead of "/healthcheck"
HealthcheckController.get("/", healthcheckHandler);


export default HealthcheckController;
