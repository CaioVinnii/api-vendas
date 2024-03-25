import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1710734445213 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // NOME DA TABELA ->
        name: 'customers',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
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
    await queryRunner.dropTable('customers');
  }

}
