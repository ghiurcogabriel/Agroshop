import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropOrderEmailUnique1722610359207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rows: Array<{ CONSTRAINT_NAME: string }> = await queryRunner.query(
      `
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'orders'
        AND COLUMN_NAME = 'email'
        AND CONSTRAINT_NAME <> 'PRIMARY'
      `,
    );

    for (const row of rows) {
      await queryRunner.query(
        `ALTER TABLE orders DROP INDEX \`${row.CONSTRAINT_NAME}\``,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE orders ADD UNIQUE INDEX `UQ_orders_email` (`email`)',
    );
  }
}
