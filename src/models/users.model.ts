import { any } from 'bluebird';
import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
} from 'sequelize-typescript';

export interface UserI {
  id?: number | null;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class Users extends Model<UserI> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string;

  @Default(false)
  @NotEmpty
  @Column
  is_admin!: boolean;
}
