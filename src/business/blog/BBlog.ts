import { STATUS_RECORD } from './../../enums/common';
import { prisma } from "../../db/mysql";
import { GetBlogByIdDto, GetBlogDto } from "../../dtos";
import { STATUS_CODE } from "../../enums";
import { BlogInformation, ResponseHttp } from "../../interfaces";
import { IBlog } from "./IBlog";

export class BBlog implements IBlog {

    public async getBlogs(year: number, categorieId: number, page: number, limit: number): Promise<ResponseHttp<GetBlogDto>> {

        try {

            const blogs: BlogInformation[] = await prisma.$queryRaw`
                SELECT B.BLO_ID as id, B.BLO_TITLE as title, B.BLO_DESCRIPTION as description, B.BLO_IMG_URL1 as imageUrl1,
                CB.CATBL_DAY as day, CB.CATBL_MONTH as month
                FROM BLOG AS B INNER JOIN
                CATEGORIE_BLOG AS CB ON B.BLO_ID = CB.CATBL_BLOG
                WHERE CB.CATBL_CATEGORIE = ${categorieId}
                AND CB.CATBL_YEAR = ${year}
                AND B.BLO_STATUS = ${STATUS_RECORD.ACTIVE}
                ORDER BY CB.CATBL_MONTH, CB.CATBL_DAY
                LIMIT ${limit} OFFSET ${(page - 1) * limit}
            `;

            if (blogs.length === 0) {
                return {
                    status: STATUS_CODE.NOT_FOUND,
                    error: 'No existen blogs creados'
                }
            }

            const totalRecords = await prisma.bLOG.groupBy({
                by: ['BLO_ID'],
                where: {
                    BLO_STATUS: STATUS_RECORD.ACTIVE,
                    CATEGORIE_BLOG: {
                        some: {
                            CATBL_CATEGORIE: categorieId,
                            CATBL_YEAR: year
                        }
                    }
                },
                _count: {
                    BLO_ID: true
                }
            });

            const getBlogDto = GetBlogDto.create({ 
                page, 
                totalRecords: totalRecords.length,
                totalPage: Math.ceil(totalRecords.length / limit),
                blogs 
            });

            return {
                status: STATUS_CODE.OK,
                data: getBlogDto
            }

        } catch (error) {
            console.log(error);
            throw {
                status: STATUS_CODE.SERVER_INTERNAL,
                error: 'Habla con el administrador'
            }
        }
    }

    public async getBlog(blogId: number): Promise<ResponseHttp<GetBlogByIdDto>> {
        try {
            const blog = await prisma.bLOG.findFirst({
                where: {
                    BLO_ID: blogId,
                    BLO_STATUS: STATUS_RECORD.ACTIVE
                }
            });
    
            if (!blog) {
                return {
                    status: STATUS_CODE.NOT_FOUND,
                    error: `No existen blog con el id ${blogId}`
                }
            }
    
            const { BLO_ID:id, BLO_TITLE:title, BLO_CONTENT:content, BLO_IMG_URL2:imageUrl2 } = blog;
    
            return {
                status: STATUS_CODE.OK,
                data: GetBlogByIdDto.create({ id, title, content, imageUrl2 })
            }
        } catch (error) {
            console.log(error);
            throw {
                status: STATUS_CODE.SERVER_INTERNAL,
                error: 'Habla con el administrador'
            }
        }
    }

}