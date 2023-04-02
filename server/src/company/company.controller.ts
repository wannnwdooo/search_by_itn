import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post()
  getCompany(@Body() dto: CompanyDto) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(dto.query)) {
      throw new BadRequestException([
        'Буквы и спецсимволы - не верный тип данных',
      ]);
    }
    return this.companyService.getCompany(dto);
  }
}
