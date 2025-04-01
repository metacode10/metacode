import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('stock_data')
export class StockData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  stock_code: string;

  @Column({ type: 'varchar', length: 255 })
  stock_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  stock_slug: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  type: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  category: string | null;

  @Column({ type: 'json', nullable: true, default: null })
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  tags: any | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  price: number | null;

  @Column({ type: 'int', nullable: true, default: null })
  lot_size: number | null;

  @Column({ type: 'int', nullable: true, default: null })
  min_trade_qty: number | null;

  @Column({ type: 'boolean', nullable: true, default: null })
  is_active: boolean | null;

  @Column({ type: 'int', nullable: true, default: null })
  unknown_value: number | null;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  currency: string | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  change_percent: number | null;

  @Column({ type: 'bigint', nullable: true, default: null })
  volume: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  turnover_rate: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  market_cap: number | null;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  market_currency: string | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  pe_ratio: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  pb_ratio: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  dividend_yield: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  eps: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  roe: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  debt_ratio: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  sector: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  country: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  industry: string | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  beta: number | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  earnings_announcement: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  ex_dividend_date: Date | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  price_target: number | null;

  @Column({ type: 'numeric', nullable: true, default: null })
  price_change: number | null;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  exchange: string | null;
}
