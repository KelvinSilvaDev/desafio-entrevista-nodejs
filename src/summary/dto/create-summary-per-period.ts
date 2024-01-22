import { ApiProperty } from "@nestjs/swagger";

export class CreateSummaryPerPeriodDto {
    @ApiProperty({
        description: 'The start date of the period',
        example: '2021-01-01',

    })
    startDate: Date;
    @ApiProperty({
        description: 'The end date of the period',
        example: '2021-01-01',

    })
    endDate: Date;
}