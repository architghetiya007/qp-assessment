import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    inventory: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;
}

export class UpdateProductRequestDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    inventory: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;
}