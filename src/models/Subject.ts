import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Subject extends Model {
  declare id: number;
  declare code: string;
  declare name: string;
}

Subject.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "subjects",
    timestamps: true,
    underscored: true,
  }
);

export default Subject;
