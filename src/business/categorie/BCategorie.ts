import { prisma } from "../../db/mysql";
import { GetCategoryDto } from "../../dtos";
import { STATUS_CODE, STATUS_RECORD } from "../../enums";
import { ResponseHttp } from "../../interfaces";
import { ICategory } from "./ICategorie";

export class BCategory implements ICategory {
    public async getCategories(): Promise<ResponseHttp<GetCategoryDto[]>> {
       try {
            const categories = await prisma.cATEGORIE.findMany({
                select: {
                    CAT_ID: true,
                    CAT_TITLE: true,
                    CATEGORIE_BLOG: {
                        select: {
                            CATBL_YEAR: true
                        },
                    }
                },
                where: {
                    CAT_STATUS: STATUS_RECORD.ACTIVE
                }
            });

            if (categories.length == 0) {
                return {
                    status: STATUS_CODE.NOT_FOUND,
                    error: 'No existen categorias creadas'
                }
            }

            return {
                status: STATUS_CODE.OK,
                data: categories.map(({ CAT_ID:id, CAT_TITLE:name, CATEGORIE_BLOG }, index) => GetCategoryDto.create({ 
                    id,
                    ariaExpanded: (index === 0) ? true : false,
                    name, 
                    years: CATEGORIE_BLOG.map(cb => cb.CATBL_YEAR).filter((value, index, self) => self.indexOf(value) === index) 
                }))
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