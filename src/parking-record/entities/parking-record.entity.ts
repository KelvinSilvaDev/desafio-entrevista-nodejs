import { Establishment } from "src/establishment/entities/establishment.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class ParkingRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vehicle)
    vehicle: Vehicle;

    @ManyToOne(() => Establishment)
    establishment: Establishment;

    @Column()
    entryTime: Date;

    @Column({ nullable: true })
    exitTime: Date;
}
