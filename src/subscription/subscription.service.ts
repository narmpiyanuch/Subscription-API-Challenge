import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SubscriptionService {
    constructor(private prisma: PrismaService) { }

    async getAllList() {
        const allLists = await this.prisma.subscription.findMany({
            select: {
                msisdn: true,
                createdAt: true,
                services: {
                    select: {
                        description: true
                    }
                }
            }
        });
        return { allLists }
    }

    async getListByNum(msisdn: string) {
        if (msisdn.length !== 11 || !msisdn.startsWith('99')) {
            throw new BadRequestException('Invalid mobile number, Please check again')
        }
        const listByNum = await this.prisma.subscription.findMany({
            where: {
                msisdn
            },
            select: {
                msisdn: true,
                createdAt: true,
                services: {
                    select: {
                        description: true
                    }
                }
            }
        });
        if (listByNum.length === 0) {
            return { message: 'Subscription not found' }
        }
        return { listByNum }
    }

    async removeListByNum(msisdn: string) {
        if (msisdn.length !== 11 || !msisdn.startsWith('99')) {
            throw new BadRequestException('Invalid mobile number, Please check again')
        }

        // delete service table first
        await this.prisma.service.deleteMany({
            where: {
                subscription: {
                    msisdn
                }
            }
        })

        // delete subscription table
        await this.prisma.subscription.deleteMany({
            where: {
                msisdn
            }
        });

        return { message: 'Already deleted!' }
    }
}
