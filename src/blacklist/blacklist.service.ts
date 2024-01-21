import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BlacklistDto } from './dto/blacklist.dto';
import { ReasonDto } from './dto/reason.dto';

@Injectable()
export class BlacklistService {
    constructor(private prisma: PrismaService) { }

    async getBlacklistByNum(msisdn: string) {
        if (msisdn.length !== 11 || !msisdn.startsWith('99')) {
            throw new BadRequestException('Invalid mobile number')
        }
        const blacklistbyNum = await this.prisma.blacklist.findMany({
            where: {
                msisdn
            }
        })
        if (blacklistbyNum.length === 0) {
            return { message: 'Not found in blacklist' }
        }
        return { blacklistbyNum }
    }

    async createBlacklist(dto: BlacklistDto) {
        const { msisdn, reason } = dto;
        const blacklist = await this.prisma.blacklist.create({
            data: {
                msisdn,
                reason
            }
        })
        return { blacklist }
    }

    async updateReason(msisdn: string, dto: ReasonDto) {
        const { reason } = dto;
        if (msisdn.length !== 11 || !msisdn.startsWith('99')) {
            throw new BadRequestException('Invalid mobile number, Please check again')
        }
        const foundBlacklist = await this.prisma.blacklist.findFirst({
            where: {
                msisdn
            }
        });
        if (!foundBlacklist) {
            throw new BadRequestException('Not found in blacklist')
        }
        const updateBlacklist = await this.prisma.blacklist.update({
            where: {
                id: foundBlacklist.id
            },
            data: {
                reason
            }
        })
        return { message: 'Already updated', updateBlacklist }
    }

    async removeBlacklistByNum(msisdn: string) {
        if (msisdn.length !== 11 || !msisdn.startsWith('99')) {
            throw new BadRequestException('Invalid mobile number')
        }
        await this.prisma.blacklist.deleteMany({
            where: {
                msisdn
            }
        })
        return { message: 'Already remove from blacklist' }
    }
}
