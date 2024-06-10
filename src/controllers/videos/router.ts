import { Router } from "express";
import { BVideo } from "../../business";
import { VideoController } from "./controller";

export class VideoRoutes {
    static get routes(): Router {

        const router = Router();

        const bVideo = new BVideo();
        const controller = new VideoController(bVideo);
        
        // Definir las rutas
        router.get('/', controller.getVideos);
    
        return router;
      }
}