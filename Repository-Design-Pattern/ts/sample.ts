/**
 * Repository Design Pattern
 * 
 * 
 * Reference:
 *  - https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30
 */



interface Repository<T, K> {
    read(): T[];
    readById(id: K): T;
    create(entity: T): T;
    update(entity: T): T;
    delete(entity: T): T;
}

class Article {
    id: number;
}

class Tag {
    id: number;
}

interface ArticleRepository extends Repository<Article, number> {
    read(): Article[];
    readById(id: number): Article;
    create(article: Article): Article;
    update(article: Article): Article;
    delete(article: Article): Article;
    readLatest(): Article[];
    readByTags(...tags: Tag[]): Article;
}
