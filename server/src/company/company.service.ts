import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CompanyDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    private http: HttpService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async getCompany(dto: CompanyDto) {
    try {
      const search = await this.prisma.company.findMany({
        where: { itn: dto.query },
      });
      if (search.length) {
        return search;
      }
      const searchAnotherDB = await this.searchCompany(dto);
      const pushInDB = searchAnotherDB.map(async (el) => {
        await this.prisma.company.create({
          data: {
            name: el.value,
            itn: el.data.inn,
          },
        });
      });

      await Promise.allSettled(pushInDB);
      return await this.prisma.company.findMany({
        where: { itn: dto.query },
      });
    } catch (err) {
      throw err;
    }
  }
  async searchCompany(dto: CompanyDto) {
    try {
      const req = this.http
        .post(
          this.config.get('SEARCH_SERVICE_URL'),
          { query: dto.query },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${this.config.get('SEARCH_SERVICE_TOKEN')}`,
            },
          },
        )
        .pipe(map((res) => res.data.suggestions));
      return await lastValueFrom(req);
    } catch (err) {
      throw err;
    }
  }
}
