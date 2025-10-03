export function groupByField(data: any[], field: string) {
  return data.reduce((acc: any, item: any) => {
    const key = item[field] || 'Sin valor';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}