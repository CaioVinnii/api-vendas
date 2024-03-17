import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1710648967817 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // NOME DA TABELA ->
        name: 'user_tokens',
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
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
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
        ],
        foreignKeys: [
          {
            // NOME A DECLARAR
            name: 'TokenUser',
            // NOME DE REFERÊNCIA A QUAL TABLE
            referencedTableName: 'users',
            // QUAL A COLUNA EU QUERO
            referencedColumnNames: ['id'],
            // e para onde vai
            columnNames: ['user_id'],
            // CASCADE PARA QUANDO O USER_TOKENS FOR DELETADO, A CHAVE ESTRANGEIRA FOREIGN KEYS, TBM É DELETADA
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }

}
