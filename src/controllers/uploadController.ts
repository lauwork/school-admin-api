import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { Teacher, Student, Class, Subject, ClassAssignment } from "../models";

export const uploadCSV = async (req: Request, res: Response) => {

	// NOTE : Debug logs
	console.log("📤 Upload route called");
	console.log("req.file =", req.file);
	console.log("req.body =", req.body);



	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	const filePath = req.file.path;
	const rows: any[] = [];

	try {
		// Read CSV rows
		await new Promise<void>((resolve, reject) => {
			fs.createReadStream(filePath)
				.pipe(csv())
				.on("data", (data) => rows.push(data))
				.on("end", resolve)
				.on("error", reject);
		});

		for (const row of rows) {
			const {
				teacherEmail,
				teacherName,
				studentEmail,
				studentName,
				classCode,
				className,
				subjectCode,
				subjectName,
				toDelete,
			} = row;

			// skip incomplete rows
			if (!teacherEmail || !studentEmail || !classCode || !subjectCode) continue;

			// handle delete flag
			if (parseInt(toDelete) === 1) {
				const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
				const student = await Student.findOne({ where: { email: studentEmail } });
				const classModel = await Class.findOne({ where: { code: classCode } });
				const subject = await Subject.findOne({ where: { code: subjectCode } });

				if (teacher && student && classModel && subject) {
					await ClassAssignment.destroy({
						where: {
							teacher_id: teacher.id,
							student_id: student.id,
							class_id: classModel.id,
							subject_id: subject.id,
						},
					});
				}
				continue;
			}

			// find or create entities
			const [teacher] = await Teacher.findOrCreate({
				where: { email: teacherEmail },
				defaults: { name: teacherName },
			});

			const [student] = await Student.findOrCreate({
				where: { email: studentEmail },
				defaults: { name: studentName },
			});

			const [classModel] = await Class.findOrCreate({
				where: { code: classCode },
				defaults: { name: className },
			});

			const [subject] = await Subject.findOrCreate({
				where: { code: subjectCode },
				defaults: { name: subjectName },
			});

			// upsert class assignment
			await ClassAssignment.findOrCreate({
				where: {
					teacher_id: teacher.id,
					student_id: student.id,
					class_id: classModel.id,
					subject_id: subject.id,
				},
			});
		}

		fs.unlinkSync(filePath); // clean up
		return res.status(200).json({ message: `Processed ${rows.length} rows successfully.` });
	} catch (err: any) {
		console.error("CSV Upload Error:", err);
		return res.status(500).json({
			errorCode: 99,
			message: "Internal Server Error",
			details: err.message || err,
			stack: err.stack,
		});
	}

};
