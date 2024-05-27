import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // Connect to the existing database
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: "mysql",
    });

    // Initialize models and add them to the exported db object
    db.User = userModel(sequelize);

    // Mark initialization as complete
    db.initialized = true;
}








// async function initialize() {
//     // create db if it doesn't already exist
//     const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
//     const connection = await mysql.createConnection({
//         host,
//         port,
//         user,
//         password,
//     });
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//     // connect to db
//     const sequelize = new Sequelize(database, user, password, {
//         dialect: "mysql",
//     });

//     // init models and add them to the exported db object
//     db.User = userModel(sequelize);

//     // sync all models with database
//     await sequelize.sync({ alter: true });

//     db.initialized = true;
// }

// sequelize models with schema definitions

function userModel(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        telephone: { type: DataTypes.BIGINT, unique: true, allowNull: false },
        type_account: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
            allowNull: false
        },
        status_account: {
            type: DataTypes.ENUM("active", "inactive", "pending"),
            defaultValue: "active",
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE, allowNull: false,
            defaultValue: DataTypes.NOW
        }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ["hash"] },
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {} },
        },
    };

    return sequelize.define("users", attributes, options);
}
