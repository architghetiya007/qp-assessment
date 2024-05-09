import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class OrderRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    productId: any;
}