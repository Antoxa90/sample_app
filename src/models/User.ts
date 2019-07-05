import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Comments } from './Comments';

@Table( {
  tableName: 'User'
} )
export class User extends Model<User> {

  @Column
  public login: string;

  @Column
  public password: string;

  @HasMany( () => Comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true } )
  public comments: Comments[];
}
