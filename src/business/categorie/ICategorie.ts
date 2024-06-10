import { GetCategoryDto } from "../../dtos";
import { ResponseHttp } from "../../interfaces";

export interface ICategory {
    getCategories(): Promise<ResponseHttp<GetCategoryDto[]>>
}