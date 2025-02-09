export function useUuid(entityName: string) {
  return `uuid-${entityName}-${Date.now()}`;
}
