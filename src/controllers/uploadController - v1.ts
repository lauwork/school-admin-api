import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
// import { Teacher, Student, ClassModel, Subject, ClassAssignment } from "../models";
import { Teacher, Student, Class, Subject, ClassAssignment } from "../models";

// Helper to upsert (insert if not exist)
async function findOrCreate(model: any, where: any, defaults: any = {}) {
	const [record] = await model.findOrCreate({ where, defaults });
	return record;
}

export const uploadCSV = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const filePath = req.file.path;
		const records: any[] = [];

		// Read CSV
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (row) => records.push(row))
			.on("end", async () => {
				try {
					for (const row of records) {
						// Adjust field names based on actual CSV columns
						const teacher = await findOrCreate(Teacher, { email: row.teacher_email }, { name: row.teacher_name });
						const student = await findOrCreate(Student, { email: row.student_email }, { name: row.student_name });
						// const classModel = await findOrCreate(ClassModel, { code: row.class_code }, { name: row.class_name });
						const classModel = await findOrCreate(Class, { code: row.class_code }, { name: row.class_name });
						const subject = await findOrCreate(Subject, { code: row.subject_code }, { name: row.subject_name });

						await ClassAssignment.findOrCreate({
							where: {
								teacher_id: teacher.id,
								student_id: student.id,
								class_id: classModel.id,
								subject_id: subject.id,
							},
						});
					}

					fs.unlinkSync(filePath); // remove temp file
					return res.status(200).json({ message: "Upload successful", count: records.length });
				} catch (err) {
					console.error(err);
					return res.status(500).json({ error: "Failed to process CSV" });
				}
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Unexpected server error" });
	}
};
