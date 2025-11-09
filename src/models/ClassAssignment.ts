import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Teacher from "./Teacher";
import Student from "./Student";
import Class from "./Class";
import Subject from "./Subject";

class ClassAssignment extends Model {}

ClassAssignment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    class_id: { type: DataTypes.INTEGER, allowNull: false },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "class_assignments",
    timestamps: false,
    // underscored: true, // Not needed as there are no timestamp fields
  }
);

// 🔗 Associations
Teacher.hasMany(ClassAssignment, { foreignKey: "teacher_id" });
Student.hasMany(ClassAssignment, { foreignKey: "student_id" });
Class.hasMany(ClassAssignment, { foreignKey: "class_id" });
Subject.hasMany(ClassAssignment, { foreignKey: "subject_id" });

ClassAssignment.belongsTo(Teacher, { foreignKey: "teacher_id" });
ClassAssignment.belongsTo(Student, { foreignKey: "student_id" });
ClassAssignment.belongsTo(Class, { foreignKey: "class_id" });
ClassAssignment.belongsTo(Subject, { foreignKey: "subject_id" });

export default ClassAssignment;
