module.exports = (sequelize, DataTypes) => {
  const Pets = sequelize.define("Pets", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adoptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      defaultValue: null,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      defaultValue: null,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      defaultValue: null,
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hypoallergenic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dietaryRestrictions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Pets;
};
