import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { LogAction } from '../enums/log.action.enum';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @Column({ type: 'enum', default: LogAction.CREATE })
  action: LogAction;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
