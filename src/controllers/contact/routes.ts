import { Router } from "express";
import { BContact } from "../../business";
import { ContactController } from "./controller";

export class ContactRoutes {
    static get routes(): Router {

        const router = Router();

        const bContact = new BContact();
        const controller = new ContactController(bContact);
        
        // Definir las rutas
        router.post('/', controller.createContact);
    
        return router;
      }
}