import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table( {
  tableName: 'Comments'
} )
export class Comments extends Model<Comments> {
  @ForeignKey( () => User )
  @Column
  userId: number;

  @BelongsTo( () => User )
  user: User;

  @Column
  text: string;

  @Column
  creationDate: Date;
}
