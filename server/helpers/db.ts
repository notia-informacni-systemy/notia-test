import {Client, Pool, QueryResult} from 'pg';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {isNullOrUndefined} from 'util';
import {Transaction} from './transaction';
import {DbConfig} from '../config/db';

export class ResultSet {
  private m_rows: any[] = [];

  constructor(queryResult: QueryResult) {
    this.m_rows = queryResult.rows;
  }

  get row(): any {
    return !isNullOrUndefined(this.m_rows[0]) ? this.m_rows[0] : null;
  }

  get rows(): any[] {
    return this.m_rows;
  }
}

export class Db {
  private static s_pool: Pool = new Pool({
    host: DbConfig.DB.HOST,
    user: DbConfig.DB.USER,
    password: DbConfig.DB.PASSWORD,
    database: DbConfig.DB.DATABASE,
    port: DbConfig.DB.PORT
  });

  public static query(sql: string, values: any[] = [], tr?: Transaction): Observable<ResultSet> {
    return Observable.create((observer: Observer<ResultSet>) => {
      if(!tr) { // simple, single-statement query without transaction
        this.s_pool.query(sql, values).then(
          (result: QueryResult) => {
            observer.next(new ResultSet(result));
            observer.complete();
          },
          (err: Error) => {
            observer.error(err.message);
            observer.complete();
          }
        );
      } else { // transaction query
        this._getClient(tr).subscribe( // get connected client (either from transaction object or a new one from the pool)
          (client: Client) => {
            new Promise((resolve) => {
              if(tr.fresh) // execute BEGIN if fresh transaction
                resolve(client.query('BEGIN'));
              else // otherwise just resolve immediately
                resolve(Promise.resolve());
            }).then(() => { // transaction definitely in progress
              tr.fresh = false;
              return client.query(sql, values); // execute the actual query
            }).then((result: QueryResult) => {
              if(!tr.shouldCommit()) { // do not commit, client stays opened
                observer.next(new ResultSet(result));
                observer.complete();
              } else { // commit transaction and release client
                client.query('COMMIT').then(() => {
                  observer.next(new ResultSet(result));
                  client.release();
                  observer.complete();
                }).catch((err: Error) => {
                  throw err;
                });
              }
            }).catch((err: Error) => { // error in the promise chain => rollback transaction and release client
              client.query('ROLLBACK').then(() => { // rollback
                client.release();
                observer.error(err.message);
                observer.complete();
              }).catch((errRollback: Error) => { // rollback error
                client.release();
                observer.error(errRollback.message + ' ~|~ ' + err.message);
                observer.complete();
              });
            });
          },
          err => { // failed to get a client from the pool
            observer.error(err);
            observer.complete();
          }
        );
      }
    });
  }

  private static _getClient(tr?: Transaction): Observable<Client> {
    return Observable.create((observer: Observer<Client>) => {
      if(tr && tr.connection) {
        observer.next(tr.connection);
        observer.complete();
      } else {
        this.s_pool.connect().then(
          (client: Client) => {
            if(tr)
              tr.connection = client; // set client to the transaction object
            observer.next(client);
            observer.complete();
          },
          (err: Error) => {
            observer.error(err.message);
            observer.complete();
          }
        );
      }
    });
  }
}
