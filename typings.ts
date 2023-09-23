/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type MessagesCustomizer = CollectionCustomizer<Schema, 'Messages'>;
export type MessagesRecord = TPartialRow<Schema, 'Messages'>;
export type MessagesConditionTree = TConditionTree<Schema, 'Messages'>;
export type MessagesFilter = TPaginatedFilter<Schema, 'Messages'>;
export type MessagesSortClause = TSortClause<Schema, 'Messages'>;
export type MessagesAggregation = TAggregation<Schema, 'Messages'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'User'>;
export type UserRecord = TPartialRow<Schema, 'User'>;
export type UserConditionTree = TConditionTree<Schema, 'User'>;
export type UserFilter = TPaginatedFilter<Schema, 'User'>;
export type UserSortClause = TSortClause<Schema, 'User'>;
export type UserAggregation = TAggregation<Schema, 'User'>;

export type WorksCustomizer = CollectionCustomizer<Schema, 'Works'>;
export type WorksRecord = TPartialRow<Schema, 'Works'>;
export type WorksConditionTree = TConditionTree<Schema, 'Works'>;
export type WorksFilter = TPaginatedFilter<Schema, 'Works'>;
export type WorksSortClause = TSortClause<Schema, 'Works'>;
export type WorksAggregation = TAggregation<Schema, 'Works'>;

export type _prismaMigrationsCustomizer = CollectionCustomizer<Schema, '_prisma_migrations'>;
export type _prismaMigrationsRecord = TPartialRow<Schema, '_prisma_migrations'>;
export type _prismaMigrationsConditionTree = TConditionTree<Schema, '_prisma_migrations'>;
export type _prismaMigrationsFilter = TPaginatedFilter<Schema, '_prisma_migrations'>;
export type _prismaMigrationsSortClause = TSortClause<Schema, '_prisma_migrations'>;
export type _prismaMigrationsAggregation = TAggregation<Schema, '_prisma_migrations'>;


export type Schema = {
  '_prisma_migrations': {
    plain: {
      'id': string;
      'checksum': string;
      'finished_at': string;
      'migration_name': string;
      'logs': string;
      'rolled_back_at': string;
      'started_at': string;
      'applied_steps_count': number;
    };
    nested: {};
    flat: {};
  };
  'Messages': {
    plain: {
      'id': string;
      'messageId': string;
      'workId': string;
      'username': string;
      'createdAt': string;
      'channelUsername': string;
      'channelName': string;
    };
    nested: {
      'work': Schema['Works']['plain'] & Schema['Works']['nested'];
    };
    flat: {
      'work:id': string;
      'work:chatId': string;
      'work:selectedChatsId': number;
      'work:listenChannelUsernames': Array<string>;
      'work:listenWords': Array<string>;
      'work:muteChannelUsernames': Array<any>;
      'work:muteUsernames': Array<any>;
      'work:muteWords': Array<string>;
      'work:userId': string;
      'work:name': string;
      'work:createdAt': string;
      'work:updatedAt': string;
      'work:user:id': string;
      'work:user:chatId': string;
      'work:user:firstname': string;
      'work:user:username': string;
      'work:user:createdAt': string;
      'work:user:updatedAt': string;
    };
  };
  'User': {
    plain: {
      'id': string;
      'chatId': string;
      'firstname': string;
      'username': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {};
    flat: {};
  };
  'Works': {
    plain: {
      'id': string;
      'chatId': string;
      'selectedChatsId': number;
      'listenChannelUsernames': Array<string>;
      'listenWords': Array<string>;
      'muteChannelUsernames': Array<any>;
      'muteUsernames': Array<any>;
      'muteWords': Array<string>;
      'userId': string;
      'name': string;
      'createdAt': string;
      'updatedAt': string;
    };
    nested: {
      'user': Schema['User']['plain'] & Schema['User']['nested'];
    };
    flat: {
      'user:id': string;
      'user:chatId': string;
      'user:firstname': string;
      'user:username': string;
      'user:createdAt': string;
      'user:updatedAt': string;
    };
  };
};
