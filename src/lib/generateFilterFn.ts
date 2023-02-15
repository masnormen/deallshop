// import type { Project, Status, Type } from '../types/types';
// import { statusValues, typeValues } from '../types/types';

// export function generateEnumFilterFn(enums: string): ((row: Project) => boolean) | null {
//   const [fn, value] = enums.split(':') as ['is' | 'not', string];
//   if (value === '') return null;

//   let accessor: keyof Project;
//   let filterValue: boolean | string = false;

//   if (statusValues.includes(value.toLocaleUpperCase() as Status)) {
//     accessor = 'status';
//     filterValue = value.toLocaleUpperCase();
//   } else if (typeValues.includes(value.toLocaleLowerCase() as Type)) {
//     accessor = 'type';
//     filterValue = value.toLocaleLowerCase();
//   } else if (value === 'archived') {
//     accessor = 'archived';
//     filterValue = true;
//   } else {
//     return null;
//   }

//   return fn === 'is' ? (row) => row[accessor] === filterValue : (row) => row[accessor] !== filterValue;
// }

// export function generateDateFilterFn(date: string): ((row: Project) => boolean) | null {
//   const [fn, value] = date.split(':') as ['before' | 'after', string];
//   if (value === '') return null;

//   try {
//     return fn === 'before'
//       ? (row) => new Date(`${value}T00:00:00.000Z`) > new Date(row.createdOn)
//       : (row) => new Date(`${value}T00:00:00.000Z`) <= new Date(row.createdOn);
//   } catch (e) {
//     return null;
//   }
// }
