import { Request, Response } from "express";
import axios from "axios";
import { Class, Student, ClassAssignment } from "../models";

type StudentDTO = {
	id?: number;
	email: string;
	name: string;
	is_external?: boolean;
};

const EXTERNAL_BASE_URL = process.env.EXTERNAL_BASE_URL || "http://localhost:4000";

/**
 * GET /api/class/:classCode/students?page=&size=
 * Returns merged (internal + external) students, deduped by email,
 * sorted alphanumerically by name, and paginated.
 */
export const getStudentsByClass = async (req: Request, res: Response) => {
	try {
		const { classCode } = req.params;
		const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
		const size = Math.max(parseInt(String(req.query.size ?? "10"), 10) || 10, 1);

		const classModel = await Class.findOne({ where: { code: classCode } });
		if (!classModel) {
			return res.status(404).json({ error: `Class with code ${classCode} not found` });
		}

		// 1) INTERNAL students linked via ClassAssignment
		const internalAssignments = await ClassAssignment.findAll({
			where: { class_id: classModel.id },
			include: [{ model: Student, attributes: ["id", "email", "name", "is_external"] }],
		});

		const internalStudents: StudentDTO[] = internalAssignments
			.map((a: any) => a.Student)
			.filter(Boolean)
			.map((s: any) => ({
				id: s.id,
				email: s.email,
				name: s.name,
				is_external: !!s.is_external, // usually false for internal
			}));

		// 2) EXTERNAL students from external system
		//    Expecting the external app to expose something like:
		//    GET {EXTERNAL_BASE_URL}/api/class/:classCode/students
		//    and return [{ email, name }, ...]
		let externalStudents: StudentDTO[] = [];
		try {
			const resp = await axios.get(`${EXTERNAL_BASE_URL}/api/class/${encodeURIComponent(classCode)}/students`, {
				timeout: 5000,
			});
			externalStudents = (resp.data ?? []).map((e: any) => ({
				email: e.email,
				name: e.name,
				is_external: true,
			}));
		} catch (e) {
			// If external system is down, we still return internal students gracefully
			// You can log this with your Logger if you want.
			externalStudents = [];
		}

		// 3) Merge + dedupe by email (prefer internal record if collision)
		const byEmail = new Map<string, StudentDTO>();
		for (const s of externalStudents) byEmail.set(s.email, s);
		for (const s of internalStudents) byEmail.set(s.email, s); // overwrite external if same email

		let merged: StudentDTO[] = Array.from(byEmail.values());

		// 4) Sort alphanumerically by name (case-insensitive)
		merged.sort((a, b) =>
			(a.name || "").localeCompare(b.name || "", undefined, { numeric: true, sensitivity: "base" })
		);

		// 5) Paginate AFTER merging
		const total = merged.length;
		const start = (page - 1) * size;
		const end = start + size;
		const pageData = merged.slice(start, end);

		return res.json({
			classCode,
			total,
			page,
			size,
			students: pageData,
		});
	} catch (err: any) {
		console.error("Error fetching students:", err);
		return res.status(500).json({
			errorCode: 99,
			message: "Internal Server Error",
			details: err.message,
		});
	}
};




export const updateClassName = async (req: Request, res: Response) => {
	try {
		const { classCode } = req.params;
		const { name } = req.body;

		const classModel = await Class.findOne({ where: { code: classCode } });
		if (!classModel) {
			return res.status(404).json({ error: `Class with code ${classCode} not found` });
		}

		classModel.name = name;
		await classModel.save();

		return res.json({
			message: `Class '${classCode}' updated successfully.`,
			updated: {
				classCode,
				name: classModel.name,
			},
		});
	} catch (err: any) {
		console.error("Error updating class name:", err);
		return res.status(500).json({
			errorCode: 99,
			message: "Internal Server Error",
			details: err.message,
		});
	}
};
