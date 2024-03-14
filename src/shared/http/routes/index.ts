import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: "Oi amor da minha vida (leticiayanami)" });
});

export default routes;