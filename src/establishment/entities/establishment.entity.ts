import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Establishment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 14 })
    cnpj: bigint;

    @Column({ length: 500 })
    address: string;

    @Column({ length: 500 })
    phone: bigint;
}
