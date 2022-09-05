'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      // Como creo deberia ser
       User.belongsToMany(models.Game, {through: 'Usergame', foreignKey: 'idUser'});

      User.belongsTo(models.Role, {foreignKey: 'idRole'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg:"El nombre solo debe contener letras" },
        len: {
          args: [3,50],
          msg: "El nombre debe contener entre 3 a 50 letras"
        }
      }
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg:"El apellido solo debe contener letras" },
        len: {
          args: [3,50],
          msg: "El apellido debe contener entre 3 a 50 letras"
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg:"Email requerido"},
        isEmail: {msg:"Formato de email invalido"},
        len: {
          args: [5,100],
          msg: "El correo puede contener hasta 100 caracteres maximo"
        }
      }
    },
    seed: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg:"Seed requerido"},
        len: {
          args: [5,20],
          msg: "La seed debe contener entre 5 a 20 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2 // Lo crea como usuario
    },
    resetToken: {
      type: DataTypes.STRING(1020),
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING(1020),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};