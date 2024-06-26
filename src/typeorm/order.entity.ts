import { ProductEntity } from './product.entity';
import { UsersEntity } from './users.entity';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: string;

    @Column()
    qty: number;

    @Column()
    price: number;

    @ManyToOne(() => UsersEntity, user => user.id)
    userId: UsersEntity;

    @ManyToOne(() => ProductEntity, product => product.id)
    productId: ProductEntity;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}