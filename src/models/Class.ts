import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Class extends Model {
  declare id: number;
  declare code: string;
  declare name: string;
}

Class.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "classes",
    timestamps: true,
    underscored: true,
  }
);

export default Class;
