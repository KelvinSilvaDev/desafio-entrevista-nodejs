import { Establishment } from "src/establishment/entities/establishment.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true })
    totalCarSpaces?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleSpaces?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarEntries?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntries?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarExits?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExits?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarEntriesPerHour?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntriesPerHour?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarExitsPerHour?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExitsPerHour?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarEntriesPerDay?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntriesPerDay?: number;

    @Column({ type: 'integer', nullable: true })
    totalCarExitsPerDay?: number;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExitsPerDay?: number;
    @ManyToOne(() => Establishment, establishment => establishment.reports)
    establishment: Establishment;


}
