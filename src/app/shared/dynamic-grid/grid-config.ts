export class GridConfig {
    showExportButton: boolean = false;
    conditionalSelection: boolean = false;
    columnConfig: ColumnConfig[];

    constructor() {
      this.columnConfig = [];
    }
  }

  export class ColumnConfig {
    columnName: string;
    condition: any;
    value: any;
  }
