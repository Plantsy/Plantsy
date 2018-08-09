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
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		}
	});

	Plant.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		Plant.hasMany(models.Plant, {
			onDelete: "cascade",
			foreignKey: "name",
			targetKey: "category"
		});
	};
	return Plant;
};