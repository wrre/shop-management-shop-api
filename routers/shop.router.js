import { Router } from 'express';
import { ShopService } from '../services';

export const shopRouter = Router();

shopRouter.get('', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { limit = 20, offset = 0 } = req.query;
    const response = await ShopService.findShops({
      token,
      limit,
      offset,
    });

    res.json(response);
  } catch (e) {
    console.error(e);

    res.sendStatus(400);
  }
});

shopRouter.post('', async (req, res) => {
  try {
    const accountId = req.user.id;
    await ShopService.createShop({ accountId, shop: req.body });

    res.sendStatus(201);
  } catch (e) {
    console.error(e);

    res.sendStatus(400);
  }
});

shopRouter.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    await ShopService.updateShop({ token, id, shop: req.body });

    res.sendStatus(201);
  } catch (e) {
    console.error(e);

    res.sendStatus(400);
  }
});

shopRouter.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    await ShopService.deleteShop({ token, id });

    res.sendStatus(202);
  } catch (e) {
    console.error(e);

    res.sendStatus(400);
  }
});
