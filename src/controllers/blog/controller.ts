import { Request, Response } from "express"
import { IBlog } from "../../business"
import { STATUS_CODE } from "../../enums";

export class BlogController {

    constructor(
        private readonly blog: IBlog
    ){}

    getBlogs = (req: Request, res: Response) => {
        const { page, limit = 8 } = req.query;
        const { year, categorieId } = req.params;

        if(!page) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'El parametro de page es requerido' });
        }

        this.blog.getBlogs(Number(year), Number(categorieId), Number(page), Number(limit))
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error))
    }

    getBlogById = (req: Request, res: Response) => {

        const { id } = req.params;

        this.blog.getBlog(Number(id))
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error))
    }
}

