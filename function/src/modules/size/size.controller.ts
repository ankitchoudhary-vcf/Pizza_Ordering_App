import { Body, Controller, Get, Post } from "@nestjs/common";
import { sizeService } from "./size.service";


// To handel the api/size API requests.
@Controller('size')
export class sizeController {
    constructor(private readonly sizeService: sizeService){}

    // To fetch the size data from the size table.
    @Get('fetch')
    async getData() {
        return this.sizeService.fetch();
    }

    // To add new size of pizza to the size table.
    @Post('add')
    async addData(@Body() data){
        return this.sizeService.create(data)
    }
}