import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('vehicle')
export class Vehicle {
    /**
     * Identificador único do veículo
     * @example 1
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Marca do veículo
     * @example "Toyota"
     */
    @Column({ length: 500 })
    brand: string;

    /**
     * Modelo do veículo
     * @example "Corolla"
     */
    @Column({ length: 500 })
    model: string;

    /**
     * Cor do veículo
     * @example "Azul"
     */
    @Column({ length: 500 })
    color: string;

    /**
     * Placa do veículo
     * @example "ABC1234"
     */
    @Column({ length: 20 })
    licensePlate: string;

    /**
     * Tipo do veículo
     * @example "Car"
     */
    @Column({ length: 100 })
    type: string;

    /**
     * CNH associada ao veículo
     * @example "123456789"
     */
    @Column({ length: 20 })
    cnh: string;

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
}
