// ticket.entity.ts

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity } =  require('typeorm');

@Entity({name : "tambola"})
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'text', unique: true })
  ticketData;
}
