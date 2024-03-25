import Order from "@modules/orders/typeorm/entities/Order";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // TÔ ADICIONANDO QUE UM CUSTOMER, PODE TER VARIOS ORDERS, AI USO O JoinColumn() para criar a sua foreign key
  @OneToMany(() => Order, (order) => order.customer, {
    cascade: true
  })
  @JoinColumn({name: "order_id"})
  orders: Order[];

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;