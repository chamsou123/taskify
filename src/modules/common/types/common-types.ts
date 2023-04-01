/**
 * @description
 * Entities which can be soft deleted should implement this interface.
 */
export interface SoftDeletable {
  deletedAt?: Date | null;
}
