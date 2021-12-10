// eslint-disable-next-line import/newline-after-import
import './set-env';

import sequelizePkg from 'sequelize';

const { Sequelize, Model, DataTypes } = sequelizePkg;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export class ShopModel extends Model {}
ShopModel.init(
  {
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    personInCharge: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'shop' },
);

(async () => {
  await sequelize.sync({ alter: true });
})();
