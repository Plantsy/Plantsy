module.exports = function (sequelize, DataTypes) {
	var Plant = sequelize.define("Plant", {

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [1, 140]
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		instructions: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		categories: {
			type: DataTypes.Text,
		}
	});
	Plant.associate = function (models) {
		// We're saying that a Post should belong to an Author
		// A Post can't be created without an Author due to the foreign key constraint
		Plant.belongsTo(models.Categories, {
			foreignKey: {
				allowNull: false
			}
		});
	};


	return Plant;
};