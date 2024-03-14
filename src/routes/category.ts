import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const router = Router();

router
  .get("/category", async (req: Request, res: Response) => {
    try {
      const categories = await prisma.bookCategory.findMany({
        include: {
          books: true,
        },
      });
      res.send(categories);
      res.status(200);
    } catch (error) {
      res.send(error);
    }
  })
  .post("/category", async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = prisma.bookCategory.create({
        data: { name: name },
      });
      res.send(category);
    } catch (error) {
      res.send(error);
    }
  })
  .patch("/category/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body;
    try {
      const category = prisma.bookCategory.update({
        data: { name: name },
        where: {
          id: id,
        },
      });
      res.send(category);
    } catch (error) {
      res.send(error);
    }
  })
  .get("/category/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const category = await prisma.bookCategory.findUnique({
        where: {
          id: id,
        },
      });
      res.send(category);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
