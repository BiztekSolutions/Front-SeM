class Session extends Model {
  public id!: number;
  public token!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

