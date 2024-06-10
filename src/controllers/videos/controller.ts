import { Request, Response } from "express";
import { IVideo } from "../../business";

export class VideoController {
    constructor(
        private readonly video: IVideo
    ){}

    getVideos = (req: Request, res: Response) => {
        this.video.getVideo()
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error));
    }
}