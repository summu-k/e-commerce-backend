import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  DataType,
  Default,
} from 'sequelize-typescript';

export interface ProductI {
  id?: number | null;
  product_url: string;
  product_name: string;
  product_id: string;
  listing_price: number;
  sale_price: number;
  discount: number;
  brand: string;
  description: string;
  rating: number;
  reviews: number;
  images: Array<string>;
  last_visited: string;
}

@Table({
  tableName: 'product_data',
  timestamps: false,
})
export default class Products extends Model<ProductI> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  product_url!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  product_name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  product_id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  listing_price!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  sale_price!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  discount!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  brand!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  description!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  rating!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  reviews!: number;

  @Default(false)
  @NotEmpty
  @Column(DataType.JSONB)
  images!: object;

  @Default(false)
  @NotEmpty
  @Column(DataType.TIME)
  last_visited!: Date;
}
