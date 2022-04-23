import { Module } from '@nestjs/common';
import { sizeController } from './size.controller';
import { sizeService } from './size.service';
import { sizeProvider } from './size.providers';

@Module({
    providers: [sizeService, ...sizeProvider],
    exports: [sizeService],
    controllers: [sizeController],
})
export class SizeModule {}
