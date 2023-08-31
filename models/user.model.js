import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";

const User = getData.sequelizeClient.define(
  "cat_users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese un nombre",
        },
      },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese su primer apellido",
            },
        },
    },
    secondSurname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese su segundo apellido",
            },
        },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "",
      },
      validate: {
        notNull: {
          msg: "Ingrese un correo",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese una contraseña",
        },
      },
    },
    
  },
  {
    tableName: "cat_users",
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcryptjs.hashSync(user.password, 10)
              : "";
        }
      },
    },
  }
);

export const getUser = { User };