import { ApiProperty } from "@nestjs/swagger";

export class CreateVehicleDto {
    @ApiProperty({
        description: 'Marca do veículo',
        example: 'Toyota',
        type: String,
        maxLength: 500,

    })
    brand: string;

    @ApiProperty({
        description: 'Modelo do veículo',
        example: 'Corolla',
        type: String,
        maxLength: 500,

    })
    model: string;

    @ApiProperty({
        description: 'Cor do veículo',
        example: 'Azul',
        type: String,
        maxLength: 500,

    })
    color: string;

    @ApiProperty({
        description: 'Placa do veículo',
        example: 'ABC1234',
        type: String,
        maxLength: 20,

    })
    licensePlate: string;

    @ApiProperty({
        description: 'Tipo do veículo carro ou moto',
        example: 'Car',
        type: String,
        maxLength: 100,

    })
    type: string;

    @ApiProperty({
        description: 'CNH associada ao veículo',
        example: '123456789',
        type: String,
        maxLength: 20,

    })
    cnh: string;

}
