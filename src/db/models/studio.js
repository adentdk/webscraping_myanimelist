'use strict';
import { getSlug } from '@src/utils/slug';
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Studio.init({
    name: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      set (value) {
        if (value) {
          this.setDataValue('slug', getSlug(value))
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Studio',
    underscored: true,
    timestamps: false
  });

  return Studio;
};