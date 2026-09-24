import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderTables1722610359206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create orders table
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'orderNumber',
            type: 'varchar',
            length: '32',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'firstName',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'nvarchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'zipCode',
            type: 'nvarchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'county',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'nvarchar',
            length: '20',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'notes',
            type: 'nvarchar',
            length: '1500',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );

    // Create order_items table
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'tireId',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'diameter',
            type: 'nvarchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'width',
            type: 'nvarchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'height',
            type: 'nvarchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'nvarchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'orderId',
            type: 'char',
            length: '36',
            isNullable: false,
          },
        ],
      }),
    );

    // Add foreign key
    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('order_items');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('orderId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('order_items', foreignKey);
    }
    await queryRunner.dropTable('order_items');
    await queryRunner.dropTable('orders');
  }
}
