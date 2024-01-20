import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";

export class CreateParkingRecordDto {
    vehicle: Vehicle;
    establishment: Establishment;
}
