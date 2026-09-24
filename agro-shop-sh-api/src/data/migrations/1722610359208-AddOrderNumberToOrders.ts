import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOrderNumberToOrders1722610359208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'orderNumber',
        type: 'varchar',
        length: '32',
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      UPDATE orders
      SET orderNumber = CONCAT(
        'ORD-',
        UPPER(SUBSTRING(REPLACE(id, '-', ''), 1, 12))
      )
      WHERE orderNumber IS NULL OR orderNumber = ''
    `);

    await queryRunner.changeColumn(
      'orders',
      'orderNumber',
      new TableColumn({
        name: 'orderNumber',
        type: 'varchar',
        length: '32',
        isNullable: false,
      }),
    );

    await queryRunner.query(
      'ALTER TABLE orders ADD UNIQUE INDEX `UQ_orders_order_number` (`orderNumber`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE orders DROP INDEX `UQ_orders_order_number`',
    );
    await queryRunner.dropColumn('orders', 'orderNumber');
  }
}
