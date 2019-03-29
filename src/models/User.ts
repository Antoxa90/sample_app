import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Comments } from './Comments';

@Table( {
  tableName: 'user'
} )
export class User extends Model<User> {

  @Column
  login: string;

  @Column
  password: string;

  @HasMany( () => Comments )
  comments: Comments[]
}
