import { ApiProperty } from "@nestjs/swagger";

export class CreateReportDto {
    @ApiProperty({
        description: 'Total Car Spaces',
        example: 10,
    })
    totalCarSpaces: number;

    @ApiProperty({
        description: 'Total Motorcycle Spaces',
        example: 10,
    })
    totalMotorcycleSpaces: number;

    @ApiProperty({
        description: 'Total Car Entries',
        example: 10,
    })
    totalCarEntries: number;

    @ApiProperty({
        description: 'Total Motorcycle Entries',
        example: 10,
    })
    totalMotorcycleEntries: number;

    @ApiProperty({
        description: 'Total Car Exits',
        example: 10,
    })
    totalCarExits: number;

    @ApiProperty({
        description: 'Total Motorcycle Exits',
        example: 10,
    })
    totalMotorcycleExits: number;

    @ApiProperty({
        description: 'Total Car Entries per Hour',
        example: 10,
    })
    totalCarEntriesPerHour: number;

    @ApiProperty({
        description: 'Total Motorcycle Entries per Hour',
        example: 10,
    })
    totalMotorcycleEntriesPerHour: number;

    @ApiProperty({
        description: 'Total Car Exits per Hour',
        example: 10,
    })
    totalCarExitsPerHour: number;

    @ApiProperty({
        description: 'Total Motorcycle Exits per Hour',
        example: 10,
    })
    totalMotorcycleExitsPerHour: number;

    @ApiProperty({
        description: 'Total Car Entries per Day',
        example: 10,
    })
    totalCarEntriesPerDay: number;

    @ApiProperty({
        description: 'Total Motorcycle Entries per Day',
        example: 10,
    })
    totalMotorcycleEntriesPerDay: number;

    @ApiProperty({
        description: 'Total Car Exits per Day',
        example: 10,
    })
    totalCarExitsPerDay: number;

    @ApiProperty({
        description: 'Total Motorcycle Exits per Day',
        example: 10,
    })
    totalMotorcycleExitsPerDay: number;

}
