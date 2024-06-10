import { BlogInformation } from "../../interfaces";

export class GetBlogDto {
    private constructor(
        public readonly page: number,
        public readonly totalRecords: number,
        public readonly totalPage: number,
        public readonly blogs: BlogInformation[] 
    ){}

    public static create(object: { [key: string]: any }): GetBlogDto {
        const { blogs, page, totalPage, totalRecords } = object;
        return new GetBlogDto(page, totalRecords, totalPage, blogs);
    }
}