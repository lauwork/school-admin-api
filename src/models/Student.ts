import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Student extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
  declare is_external: boolean;
}

Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    is_external: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: true,
    underscored: true,
  }
);

export default Student;
