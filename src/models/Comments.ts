import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table( {
  tableName: 'Comments'
} )
export class Comments extends Model<Comments> {
  @ForeignKey( () => User )
  @Column
  public userId: number;

  @BelongsTo( () => User )
  public user: User;

  @Column
  public text: string;

  @Column
  public creationDate: Date;
}
