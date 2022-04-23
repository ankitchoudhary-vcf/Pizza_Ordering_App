import { Inject, Injectable } from "@nestjs/common";
import { SIZE_REPOSITORY } from "src/core/constants";
import { Size } from './size.entity';


@Injectable()
export class sizeService {
    constructor(@Inject(SIZE_REPOSITORY) private readonly sizeService: typeof Size){}
    
    // To add new size of pizza into Size table.
    async create(data){
        return this.sizeService.create<Size>(data);
    }

    // To fetch the size table
    async fetch(){
        return this.sizeService.findAll<Size>();
    }
}