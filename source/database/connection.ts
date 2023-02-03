import { MongoClient } from 'mongodb';
import { uri }         from '@config/database.json';

export const DatabaseClient = new MongoClient(uri);
export const Database = DatabaseClient.db('Kimiora');