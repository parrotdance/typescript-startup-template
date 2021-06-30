import { Collection } from 'mongodb'

export const getColByNameFromCols = (name: string, fromCols: Collection[]) => fromCols.find(col => col.collectionName === name)
