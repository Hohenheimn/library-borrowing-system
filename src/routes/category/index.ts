import { Router, Response, Request } from "express";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";

import { categorySchema } from "./schema";

const zodValidate = require("../../middleware/zod.validate");

const prisma = new PrismaClient();

const router = Router();

type categoryType = z.infer<typeof categorySchema>;

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
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .post(
    "/category",
    zodValidate(categorySchema),
    async (req: Request, res: Response) => {
      const body: categoryType = req.body;
      try {
        const category = await prisma.bookCategory.create({
          data: body,
        });
        res.send(category);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  )
  .patch("/category/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
      const category = await prisma.bookCategory.update({
        where: {
          id: id,
        },
        data: { name: name },
      });
      res.send(category);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .delete("/category/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const category = await prisma.bookCategory.delete({
        where: {
          id: id,
        },
      });
      res.send(category);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
