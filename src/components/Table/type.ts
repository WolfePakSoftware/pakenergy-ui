import { ISetupEditToolbar, IVActionEditTableProps } from './Table';

export type EditColumns = 'ALL';
export type DefaultheightRow = 'SHORT' | 'HALF' | 'LONG';
export type CellSelectionType = 'FREE' | 'ENTIRE_ROW' | 'CELL' | 'DISABLED';

export interface EditSetup {
  editToolbar?: ISetupEditToolbar;
  editColumn: IVActionEditTableProps;
  onSave: (data: any) => void;
  invalidDataMessage?: (invalidColumns: string[]) => void;
}

export interface IDataEdited {
  rowIndex: number;
  data: any;
}

export interface IActionSelection {
  onSelectionChange?: any;
  onDoubleClick?:(value:any,rowIndex:number,columnIndex:number,columnName:string)=>void;
  clearSelection?: boolean;
  onSelectionCleaned?: (isSelectionCleaned: boolean) => any;
}

export interface ITextAlignColumn {
  columns: string | 'ALL';
  textAlign: string | 'center' | 'end' | 'left';
}

export interface IVConfigTextAlign {
  textAlign?: string | 'center' | 'end' | 'left';
}
