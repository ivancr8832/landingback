import { Router } from "express";
import { BlogController } from "./controller";
import { BBlog } from "../../business";

export class BlogRoutes {
    static get routes(): Router {
        const router = Router();

        const bBlog = new BBlog();
        const controller = new BlogController(bBlog);

        // Definir las rutas
        router.get('/list/:year/:categorieId', controller.getBlogs);
        router.get('/selected/:id', controller.getBlogById);

        return router;
    }
}