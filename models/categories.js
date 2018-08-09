
module.exports = function (sequelize, DataTypes) {
	var Category = sequelize.define("Category", {

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [1, 140]
			}
		},
	});
    
	Category.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		Category.hasMany(models.Plant, {
			onDelete: "cascade",
			foreignKey: "name",
			sourceKey: "category"
		});
	};
    
	return Category;
};