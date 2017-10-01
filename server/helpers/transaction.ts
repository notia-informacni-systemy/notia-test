export class Transaction {
  private m_connection: any;
  private m_commit: boolean;
  private m_fresh: boolean;

  constructor() {
    this.m_connection = null;
    this.m_commit = false;
    this.m_fresh = true;
  }

  commit(): Transaction {
    this.m_commit = true;
    return this;
  }

  get connection(): any {
    return this.m_connection;
  }

  set connection(con: any) {
    this.m_connection = con;
  }

  get fresh() {
    return this.m_fresh;
  }

  set fresh(fresh: boolean) {
    this.m_fresh = fresh;
  }

  shouldCommit(): boolean {
    return this.m_commit;
  }
}
