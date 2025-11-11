import { Request, Response } from "express";
import { Teacher } from "../models";

export const getTeachers = async (req: Request, res: Response) => {
	try {
		const teachers = await Teacher.findAll({ attributes: ["id", "name", "email"] });
		return res.json({ count: teachers.length, data: teachers });
	} catch (err: any) {
		console.error("Error fetching teachers:", err);
		return res.status(500).json({
			errorCode: 99,
			message: "Internal Server Error",
			details: err.message,
		});
	}
};
