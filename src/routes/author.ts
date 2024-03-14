import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const router = Router();

router
  .get("/author", async (req: Request, res: Response) => {
    try {
      const authors = await prisma.author.findMany({
        include: {
          books: true,
        },
      });
      res.send(authors);
    } catch (error) {
      res.send(error);
    }
  })
  .post("/author", async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const author = prisma.author.create({
        data: { name: name },
      });
      res.send(author);
    } catch (error) {
      res.send(error);
    }
  })
  .patch("/author/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body;
    try {
      const author = prisma.author.update({
        data: { name: name },
        where: {
          id: id,
        },
      });
      res.send(author);
    } catch (error) {
      res.send(error);
    }
  })
  .get("/author/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const author = await prisma.author.findUnique({
        where: {
          id: id,
        },
      });
      res.send(author);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
