import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
    constructor(private prisma: PrismaService) { }

    async createRegister(dto: RegisDto) {
        const { msisdn, service } = dto;
        // check mssidn pattern
        if (!(msisdn.startsWith('99') && msisdn.length === 11)) {
            throw new BadRequestException('Invalid mobile number, Please check again')
        }

        // check service limit
        const serviceUser = await this.prisma.subscription.findMany({ where: { msisdn } });
        if (serviceUser) {
            const serviceCount = serviceUser.reduce((count, item) => {
                return item.msisdn === msisdn ? count + 1 : count
            }, 0)
            const IsMoreThree = serviceCount >= 3;
            if (IsMoreThree) {
                throw new BadRequestException("This mobile number has subscription more than 3")
            }
        }

        // check blacklist
        const checkBlacklist = await this.prisma.blacklist.findFirst({
            where: {
                msisdn
            }
        })
        if (checkBlacklist) {
            throw new ForbiddenException('You are in blacklist')
        }

        // create subscription
        const user = await this.prisma.subscription.create({
            data: {
                msisdn,
                services: {
                    create: [
                        { description: service }
                    ]
                }
            }
        })
        return { message: 'Registered successfully', user }
    }

}
