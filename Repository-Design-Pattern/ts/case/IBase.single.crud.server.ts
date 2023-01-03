

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
 * Base Simple Interface Service.
 */
export interface IBaseSimpleService<T> {
  getAll(): Promise<T[]>;

  getOne(id: string): Promise<T>;

  create(createdDto: CreateBaseDto): Promise<T>;

  update(id: string, updatedDto: UpdateBaseDto): Promise<T>;

  delete(id: string): Promise<void>;
}

/**
 * For single argument: entity, but created/update dto are based on BaseEntity.
 */
export class ORingBaseSimpleTemplateService<T extends BaseEntity> {
  constructor(protected repo) {
    this.repo = repo;
  }

  /**
   * get all elements for database entity. 
   * 
   * @returns 
   */
  async getAll(): Promise<T[]> {
    return await this.repo.find();
  }

  /**
   * get one data based on id number.
   * 
   * @param id 
   * @returns 
   */
  async getOne(id: string): Promise<T> {
    const d = await this.repo.findOne({ where: {id}});

    if (d) {
      return d;
    }

    throw new Error('data not found'); // if http exception, please use 'HttpException('data not found', HttpStatus.NOT_FOUND);'
  }

  /**
   * create a new database entity.
   * 
   * @param data CreateBaseDto is based on BaseEntity.
   * @returns 
   */
  async create(data: CreateBaseDto): Promise<T> {
    const ct = await this.repo.create(data);
    await this.repo.save(ct);
    return ct;
  }

  /**
   * update a specific database entity by id.
   * 
   * @param id entity's id.
   * @param data UpdateBaseDto is based on BaseEntity.
   * @returns 
   */
  async update(id: string, data: UpdateBaseDto): Promise<T> {
    await this.repo.update({id}, data);

    const d = await this.repo.findOne({ where: {id}});
    if (d) {
      return d;
    }

    throw new Error('data not found.'); // if http exception, please use 'HttpException('data not found', HttpStatus.NOT_FOUND);'
  }

  /**
   * delete a specific database entity by id.
   * 
   * @param id entity's id.
   */
  async delete(id: string): Promise<void> {
    const deleteData = await this.repo.delete({id});
    // return { deleted: true };

    if (!deleteData.affected) {
      throw new Error('data not found.'); // if http exception, please use 'HttpException('data not found', HttpStatus.NOT_FOUND);'
    }
  }
}