import { IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisDto {
    @IsNotEmpty({ message: 'Mssidn is required' })
    @IsString()
    @Matches(/^99\d{9}$/, { message: 'Invalid mobile number, Please check again' })
    msisdn: string;

    @IsNotEmpty({ message: 'Reason is required' })
    @IsString()
    public service: string;
}