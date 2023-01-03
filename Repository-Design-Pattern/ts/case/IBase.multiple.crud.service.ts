/*
 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

 interface IBaseDto<T> {
  data: T;
  getData(): T;
}

interface IBaseCreateDto<T> extends IBaseDto<T> {

}

interface IBaseUpdateDto<T> extends IBaseDto<T> {
  
}

/**
 * base create data dto.
 */
export class CreateBaseDto implements IBaseCreateDto<CreateBaseDto> {
  data: CreateBaseDto;

  getData(): CreateBaseDto {
    return this.data;
  }
}

/**
 * base update data dto.
 */
export class UpdateBaseDto implements IBaseUpdateDto<UpdateBaseDto> {
  data: UpdateBaseDto;

  getData(): UpdateBaseDto {
    return this.data;
  }
}

/**
 * Base Multiple Interface Service.
 */
export interface IBaseService<T, C, U> {
  // T: entity, C: created Dto, U: updated Dto.

  getAll(): Promise<T[]>;

  getOne(id: string): Promise<T>;

  create(createdDto: C): Promise<T>;

  update(id: string, updatedDto: U): Promise<T>;

  delete(id: string): Promise<void>;
}

export abstract class IGenericService<T, C, U> implements IBaseService<T, C, U> {
  abstract getAll(): Promise<T[]>;

  abstract getOne(id: string): Promise<T>;

  abstract create(createdDto: C): Promise<T>;

  abstract update(id: string, updatedDto: U): Promise<T>;

  abstract delete(id: string): Promise<void>;
}

/**
 * base entity.
 */
export class BaseEntity {
  // @PrimaryGeneratedColumn()
  id: string;

  /** created time for data. */
  // @Exclude()
  // @CreateDateColumn()
  // @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /** last updated time for data. */
  // @Exclude()
  // @UpdateDateColumn()
  // @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}

/**
 * For mulitple arguments: entity, created dto, updated dto.
 */
export class ORingBaseMultipleTemplateService<T extends BaseEntity, C extends CreateBaseDto, U extends UpdateBaseDto> {
  constructor(protected repo) {
    this.repo = repo;
  }

  async getAll(): Promise<T[]> {
    return await this.repo.find();
  }

  async getOne(id: string): Promise<T> {
    const d = await this.repo.findOne({ where: {id}});

    if (d) {
      return d;
    }

    throw new Error('data not found.'); // if http exception, 'HttpException('data not found', HttpStatus.NOT_FOUND);'
  }

  async create(data: C): Promise<T> {
    const ct = await this.repo.create(data);
    await this.repo.save(ct);
    return ct;
  }

  async update(id: string, data: U): Promise<T> {
    await this.repo.update({id}, data);

    const d = await this.repo.findOne({ where: {id}});
    if (d) {
      return d;
    }
    
    throw new Error('data not found.'); // if http exception, 'HttpException('data not found', HttpStatus.NOT_FOUND);'
  }

  async delete(id: string): Promise<void> {
    const deleteData = await this.repo.delete({id});
    // return { deleted: true };

    if (!deleteData.affected) {
      throw new Error('data not found.'); // if http exception, 'HttpException('data not found', HttpStatus.NOT_FOUND);'
    }
  }
}