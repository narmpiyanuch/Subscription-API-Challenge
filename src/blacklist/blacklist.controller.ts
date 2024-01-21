import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistDto } from './dto/blacklist.dto';
import { ReasonDto } from './dto/reason.dto';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) { }

  @Get('/:msisdn')
  getBlacklistByNum(@Param('msisdn') msisdn: string) {
    return this.blacklistService.getBlacklistByNum(msisdn)
  }

  @Post('/insert')
  createBlacklist(@Body() dto: BlacklistDto) {
    return this.blacklistService.createBlacklist(dto)
  }

  @Patch('/update/:msisdn')
  updateReason(@Param('msisdn') msisdn: string, @Body() dto: ReasonDto) {
    return this.blacklistService.updateReason(msisdn, dto)
  }

  @Delete('/remove/:msisdn')
  deleteBlacklistByNum(@Param('msisdn') msisdn: string) {
    return this.blacklistService.removeBlacklistByNum(msisdn)
  }
}
