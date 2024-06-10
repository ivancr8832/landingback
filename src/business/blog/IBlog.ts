import { GetBlogByIdDto, GetBlogDto } from "../../dtos";
import { ResponseHttp } from "../../interfaces";

export interface IBlog {
    getBlogs(year: number, categorieId: number,  page: number, limit: number): Promise<ResponseHttp<GetBlogDto>>;
    getBlog(blogId: number): Promise<ResponseHttp<GetBlogByIdDto>>;
}