// NOTE: to test simple api call
import { Request, Response } from "express";
import { Teacher } from "../models";

export const getTeachers = async (req: Request, res: Response) => {
	try {
		const teachers = await Teacher.findAll();
		res.json({ count: teachers.length, data: teachers });
	} catch (error) {
		console.error("Error fetching teachers:", error);
		res.status(500).json({
			error: "Failed to fetch teachers",
			details: error.message || error,
		});
	}
};
