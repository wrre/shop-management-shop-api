import { ShopModel } from '../src/models';

export class ShopService {
  static async findShopPermissionsAccountIds(accountId) {
    // TODO get from account api
    const accountIds = [accountId, 3];

    return accountIds;
  }

  static async findShops(data) {
    const { accountId, limit, offset } = data;
    const accountIds = await this.findShopPermissionsAccountIds(accountId);
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
      accountId,
      id,
      shop: { name, address, phone, personInCharge },
    } = data;
    const accountIds = await this.findShopPermissionsAccountIds(accountId);
    await ShopModel.update(
      { name, address, phone, personInCharge },
      { where: { id, accountId: accountIds } },
    );
  }

  static async deleteShop(data) {
    const { accountId, id } = data;
    const accountIds = await this.findShopPermissionsAccountIds(accountId);
    await ShopModel.destroy({ where: { id, accountId: accountIds } });
  }
}
