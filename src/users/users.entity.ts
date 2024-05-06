import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}