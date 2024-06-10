export class GetBlogByIdDto {
    private constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly imageUrl2: string
    ) {}

    public static create(object: { [key: string]: any }): GetBlogByIdDto {
        const { id, title, content, imageUrl2 } = object;
        return new GetBlogByIdDto(id, title, content, imageUrl2);
    }
}