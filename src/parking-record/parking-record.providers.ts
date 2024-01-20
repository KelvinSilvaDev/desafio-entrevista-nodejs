import { DataSource } from 'typeorm'
import { ParkingRecord } from './entities/parking-record.entity'

export const parkingRecordProviders = [
    {
        provide: 'PARKING_RECORD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ParkingRecord),
        inject: ['DATA_SOURCE'],
    },
]
