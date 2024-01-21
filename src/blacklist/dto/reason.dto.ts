import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ReasonDto {
    @IsNotEmpty({ message: 'Reason is required' })
    @IsString()
    reason: string;

    @IsEmpty()
    msisdn: string;
}