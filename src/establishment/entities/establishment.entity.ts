import { ParkingRecord } from 'src/parking-record/entities/parking-record.entity';
import { Report } from 'src/report/entities/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('establishment')
export class Establishment {
    /**
     * Identificador único do estabelecimento
     * @example 1
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Nome do estabelecimento
     * @example "Restaurante XYZ"
     */
    @Column({ length: 500 })
    name: string;

    /**
     * CNPJ do estabelecimento
     * @example "12.345.678/0001-90"
     */
    @Column({ length: 20 })
    cnpj: string;

    /**
     * Endereço do estabelecimento
     * @example "Rua ABC, 123"
     */
    @Column({ length: 500 })
    address: string;

    /**
     * Número de telefone do estabelecimento
     * @example "(11) 1234-5678"
     */
    @Column({ length: 20 })
    phone: string;

    /**
     * Número de vagas para motocicletas
     * @example 10
     */
    @Column({ type: 'int' })
    motorcycleSpaces: number;

    /**
     * Número de vagas para carros
     * @example 20
     */
    @Column({ type: 'int' })
    carSpaces: number;

    /**
     * Data de criação do registro
     */
    @CreateDateColumn()
    createdAt: Date;

    /**
     * Data da última atualização do registro
     */
    @UpdateDateColumn()
    updatedAt: Date;

    /**
     * Número de vagas para motocicletas ocupadas
     */
    @Column({ default: 0 })
    occupiedCarSpaces: number;

    /**
     * Número de vagas para carros ocupadas
     */
    @Column({ default: 0 })
    occupiedMotorcycleSpaces: number;

    /**
     * Relação com Report
     * @see Report
     * @see src/report/entities/report.entity.ts
     * @example Report[]
     */
    @OneToMany(() => Report, report => report.establishment)
    reports: Report[];

    /**
     * Relação com ParkingRecord
     * @see ParkingRecord
     * @see src/parking-record/entities/parking-record.entity.ts
     * @example ParkingRecord[]
     */
    @OneToMany(() => ParkingRecord, parkingRecord => parkingRecord.establishment)
    parkingRecords: ParkingRecord[];
}
