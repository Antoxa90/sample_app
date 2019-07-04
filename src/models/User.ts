import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Comments } from './Comments';

@Table( {
  tableName: 'User'
} )
export class User extends Model<User> {

  @Column
  login: string;

  @Column
  password: string;

  @HasMany( () => Comments, { onUpdate: "CASCADE", onDelete: "CASCADE", hooks: true } )
  comments: Comments[]
}
