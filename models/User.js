const { Model, DataTypes, STRING } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Create the User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  // verifyPass(pass) {
  //   return bcrypt.compareSync(pass, this.password);
  // }
  // returnUserName() {
  //   return this.username;
  // }
}

// Defines a table called User
User.init(
  {
    // Defines the columns/fields for the User table
    id: {
      // Configures the associations
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7],
      },
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },

  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    // adds a createdAt and updatedAt timestamps to the model
    timestamps: false,
    // timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
