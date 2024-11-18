import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('music')
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  releaseYear: number;

  @Column()
  genre: string;
}

export interface MusicInterface {
  id: number;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  genre: string;
}
