import { Request, Response } from "express";
import { ICategory } from "../../business";

export class CategoryController {
    constructor(
        private readonly categorie: ICategory
    ){}

    getCategories = (req: Request, res: Response) => {
        this.categorie.getCategories()
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error));
    }
}