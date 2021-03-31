import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as XLSX from 'xlsx';
import { from, Subject } from 'rxjs';

type AOA = any[][];

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
})

export class SheetJSComponent {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  headers: any = [];
  data: AOA = [[], []];
  filtersHidden: boolean = true;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.headers = this.data.shift();
      this.dtTrigger.next();
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    };
    this.filtersHidden = false;
    reader.readAsBinaryString(target.files[0]);
  }
}