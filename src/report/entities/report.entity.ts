import { Establishment } from "src/establishment/entities/establishment.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true })
    totalCarSpaces?: number | Array<{}>;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleSpaces?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarEntries?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntries?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarExits?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExits?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarEntriesPerHour?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntriesPerHour?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarExitsPerHour?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExitsPerHour?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarEntriesPerDay?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleEntriesPerDay?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalCarExitsPerDay?:  number | Array<{}> ;

    @Column({ type: 'integer', nullable: true })
    totalMotorcycleExitsPerDay?:  number | Array<{}> ;
    @ManyToOne(() => Establishment, establishment => establishment.reports)
    establishment: Establishment;


}
