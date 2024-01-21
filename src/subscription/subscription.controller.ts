import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Get('/lists')
  getAllList() {
    return this.subscriptionService.getAllList();
  }

  @Get('/list/:msisdn')
  getListByNum(@Param('msisdn') msisdn: string) {
    return this.subscriptionService.getListByNum(msisdn);
  }

  @Delete('/remove/:msisdn')
  removeListByNum(@Param('msisdn') msisdn: string) {
    return this.subscriptionService.removeListByNum(msisdn);
  }
}
