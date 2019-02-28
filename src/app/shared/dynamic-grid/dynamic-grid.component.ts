import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { headerColumns } from './gridheader.model';
import { GridConfig } from './grid-config';

@Component({
  selector: 'dynamic-grid',
  templateUrl: 'dynamic-grid.component.html',
  styleUrls: ['dynamic-grid.component.scss'],
  outputs: ['onSelection'],
})

export class DynamicGridComponent implements OnInit {
  @Input() data;
  @Input() columnDefs: any[];
  @Input() inputHeight;
  @Input() inputWidth;
  @Input() gridConfig: GridConfig;
  @Input() paginationPageSize;
  @Input() rowSelection;
  @Input() showExportButton: string;
  @Output() onSelection = new EventEmitter<any>();
  @Output() gridReadyEvent = new EventEmitter<any>()
  headers: headerColumns[];
  public gridApi;
  public gridColumnApi; 
  selectedRow: any;
  constructor() {    
    this.headers = [];
    this.selectedRow = null;  
  }

  ngOnInit() {
      
    }

 onColumnResized(event) {
     if (event.finished) {
      this.gridApi.resetRowHeights();
    }
  }
  onRowClick(event) {
    
  }
  onGridReady(params) {
    this.gridReadyEvent.emit(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(function() {
      params.api.resetRowHeights();
    }, 500);
    this.gridApi.sizeColumnsToFit();
  }
  onPaginationChanged(event:Event) {
  }
  
  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onBtPageFive() {
    this.gridApi.paginationGoToPage();
  }

  onBtPageFifty() {
    this.gridApi.paginationGoToPage();
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onSelectionChanged(event:Event) {
   let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null) {
      this.onSelection.emit(selectedRows);
    }
  }
}

