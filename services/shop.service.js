import { ShopModel } from '../src/models';

export class ShopService {
  static async findShops(data) {
    const { accountId, limit, offset } = data;
    // TODO get from account api
    const accountIds = [accountId];
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
}
