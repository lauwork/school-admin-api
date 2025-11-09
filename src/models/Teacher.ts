import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Teacher extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "teachers",
    timestamps: true,
    underscored: true,
  }
);

export default Teacher;
