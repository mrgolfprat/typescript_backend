import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface UserIF {
    id: number
    firstName: string
    lastName: string
    age: number
    username: string
    password: string
}

@Entity()
export default class User implements UserIF {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60 })
    firstName: string;

    @Column({ length: 60 })
    lastName: string;

    @Column()
    age: number;

    @Column({ length: 60, unique: true })
    username: string

    @Column({ length: 60 })
    password: string

}

