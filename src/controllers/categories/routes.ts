import { Router } from "express";
import { BCategory } from "../../business";
import { CategoryController } from "./controller";

export class CategoryRoutes {
    static get routes(): Router {

        const router = Router();

        const bCategory = new BCategory();
        const controller = new CategoryController(bCategory);
        
        // Definir las rutas
        router.get('/', controller.getCategories);
    
        return router;
      }
}