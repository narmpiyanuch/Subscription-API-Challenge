import { IsNotEmpty, IsString } from "class-validator";

export class RegisDto {
    @IsNotEmpty()
    @IsString()
    public msisdn: string;

    @IsNotEmpty()
    @IsString()
    public service: string;
}