import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export default class AlterPortifolioFieldToProviderId1624144686180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('portifolio', 'provider');
    await queryRunner.addColumn(
      'portifolio',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true
      }),
    );
    await queryRunner.createForeignKey('portifolio', new TableForeignKey({
      name: 'PortifolioProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['codigo'],
      referencedTableName: 'usuarios',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('portifolio', 'PortifolioProvider');
    await queryRunner.dropColumn('portifolio', 'provider_id');
    await queryRunner.addColumn('portifolio', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }));
  }
}
