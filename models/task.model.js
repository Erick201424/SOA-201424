import { getData } from "../config/connection.config.js";
import { DataTypes, UUIDV4 } from "sequelize";

const Task = getData.sequelizeClient.define(
  "cat_task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese un titulo para el anuncio",
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ingrese una descripcion con detalles de lo sucedido",
        },
      },
    },
    statusTask: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: "cat_task",
    freezeTableName: true,
    paranoid: true, 
  }
);


export const getTask = { Task };
