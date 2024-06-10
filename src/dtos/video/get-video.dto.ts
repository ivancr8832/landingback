import { Video } from "../../interfaces";

export class GetVideoDto {
    private constructor(
        public readonly id: number,
        public readonly url: string
    ){}

    public static create(object: { [key: string]: any }): GetVideoDto {
        const { id, url } = object;
        return new GetVideoDto(id, url);
    }
}