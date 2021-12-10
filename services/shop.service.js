import axios from 'axios';
import { ShopModel } from '../src/models';

const { ACCOUNT_SERVICE_API_HOST, ACCOUNT_SERVICE_API_PORT } = process.env;

export class ShopService {
  static async findAuthorizedAccountIds(token) {
    const accountIds = await axios
      .get(
        `http://${ACCOUNT_SERVICE_API_HOST}:${ACCOUNT_SERVICE_API_PORT}/accounts/authorized/account-ids`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => response.data.accountIds)
      .catch((e) => {
        console.log('[ERROR] findAuthorizedAccountIds error', e.response.data);

        throw e.data;
      });

    return accountIds;
  }

  static async findShops(data) {
    const { token, limit, offset } = data;
    const accountIds = await this.findAuthorizedAccountIds(token);
    const { rows: items, count } = await ShopModel.findAndCountAll({
      where: { accountId: accountIds },
      limit,
      offset,
      order: [['id', 'ASC']],
      raw: true,
    });

    return { items, count };
  }

  static async createShop(data) {
    const { accountId, shop } = data;
    await ShopModel.create({ ...shop, accountId });
  }

  static async updateShop(data) {
    const {
      token,
      id,
      shop: { name, address, phone, personInCharge },
    } = data;
    const accountIds = await this.findAuthorizedAccountIds(token);
    await ShopModel.update(
      { name, address, phone, personInCharge },
      { where: { id, accountId: accountIds } },
    );
  }

  static async deleteShop(data) {
    const { token, id } = data;
    const accountIds = await this.findAuthorizedAccountIds(token);
    await ShopModel.destroy({ where: { id, accountId: accountIds } });
  }
}
