import { Router } from "express";
import { BlogRoutes, CategoryRoutes, ContactRoutes, VideoRoutes } from "../controllers";
import { PATH_ROUTES } from "../enums";

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use(PATH_ROUTES.BLOG, BlogRoutes.routes );  
    router.use(PATH_ROUTES.CATEGORY, CategoryRoutes.routes );  
    router.use(PATH_ROUTES.CONTACT, ContactRoutes.routes );  
    router.use(PATH_ROUTES.VIDEOS, VideoRoutes.routes );  

    return router;
  }
  
}