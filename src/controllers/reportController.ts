import { Request, Response } from "express";
import { Teacher, Class, Subject, Student, ClassAssignment } from "../models";

export const getTeacherReport = async (req: Request, res: Response) => {
	try {
		// 🔹 Fetch all relationships in one go
		const assignments = await ClassAssignment.findAll({
			include: [
				{ model: Teacher, attributes: ["id", "name", "email"] },
				{ model: Class, attributes: ["id", "code", "name"] },
				{ model: Subject, attributes: ["id", "code", "name"] },
				{ model: Student, attributes: ["id", "email", "name"] },
			],
		});

		// 🔹 Build hierarchical report structure
		const reportMap = new Map<string, any>();

		for (const assignment of assignments as any[]) {
			const teacher = assignment.Teacher;
			const student = assignment.Student;
			const subject = assignment.Subject;
			const classData = assignment.Class;

			if (!teacher || !student || !subject || !classData) continue;

			// 🧩 Teacher level
			if (!reportMap.has(teacher.email)) {
				reportMap.set(teacher.email, {
					teacher: teacher.name,
					email: teacher.email,
					classes: [],
				});
			}

			const teacherEntry = reportMap.get(teacher.email);

			// 🧩 Class level
			let classEntry = teacherEntry.classes.find(
				(c: any) => c.classCode === classData.code
			);
			if (!classEntry) {
				classEntry = {
					classCode: classData.code,
					className: classData.name,
					subjects: [],
				};
				teacherEntry.classes.push(classEntry);
			}

			// 🧩 Subject level
			let subjectEntry = classEntry.subjects.find(
				(s: any) => s.subjectCode === subject.code
			);
			if (!subjectEntry) {
				subjectEntry = {
					subjectCode: subject.code,
					subjectName: subject.name,
					students: [],
				};
				classEntry.subjects.push(subjectEntry);
			}

			// 🧩 Student level (prevent duplicates)
			if (!subjectEntry.students.find((s: any) => s.email === student.email)) {
				subjectEntry.students.push({
					email: student.email,
					name: student.name,
				});
			}
		}

		const report = Array.from(reportMap.values());

		return res.json({ totalTeachers: report.length, report });
	} catch (err: any) {
		console.error("Error generating report:", err);
		return res.status(500).json({
			errorCode: 99,
			message: "Internal Server Error",
			details: err.message,
		});
	}
};
