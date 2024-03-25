import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1710815477753 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // NOME DA TABELA ->
        name: 'orders',
        // COLUNAS DA TABELA
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: "created_at",
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: "updated_at",
            type: 'timestamp',
            default: 'now()',
          }
        ]
      })
    )
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
    }

}
