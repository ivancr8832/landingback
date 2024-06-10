import { GetVideoDto } from "../../dtos";
import { ResponseHttp } from '../../interfaces';

export interface IVideo {
    getVideo(): Promise<ResponseHttp<GetVideoDto>>
}