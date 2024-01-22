import { ApiProperty } from "@nestjs/swagger";

export class CreateEstablishmentDto {
    @ApiProperty({
        description: 'The name of the establishment',
        example: 'John Doe\'s Parking Lot',
    })
    name: string;

    @ApiProperty({
        description: 'The CNPJ of the establishment',
        example: '12345678901234',
    })
    cnpj: string;
    @ApiProperty({
        description: 'The address of the establishment',
        example: 'Street John Doe, 123',
    })
    address: string;
    @ApiProperty({
        description: 'The phone of the establishment',
        example: '12345678901',
    })
    phone: string;
    @ApiProperty({
        description: 'The number of motorcycle spaces of the establishment',
        example: '10',
    })
    motorcycleSpaces: number;
    @ApiProperty({
        description: 'The number of car spaces of the establishment',
        example: '10',
    })
    carSpaces: number;
    @ApiProperty({
        description: 'The number of occupied car spaces of the establishment',
        example: '10',
    })
    occupiedCarSpaces: number;
    @ApiProperty({
        description: 'The number of occupied motorcycle spaces of the establishment',
        example: '10',
    })
    occupiedMotorcycleSpaces: number;
}
