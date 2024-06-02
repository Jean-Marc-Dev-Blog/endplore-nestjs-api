import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ length: 12 })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  jobRole: string;
}
