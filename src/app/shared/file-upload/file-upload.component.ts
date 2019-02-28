import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { FileUploadService } from "./file-upload.service";
import { MyFacilityService } from "src/app/myfacility/services/myfacility.service";
import { FileMetaDatas } from "src/app/myapplication/application-process/ownership-question/question.model";
import { _Document_Type_Ids } from "../application-constants";
import { HttpoptionsService } from "../httpoptions.service";
const _Max_File_Size = 10590617;

@Component({
  selector: "file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements OnInit {
  uploadIconMsg = " Please click the upload arrow to start your file upload ";
  @ViewChild("file") file;
  @Input() isMultiple: boolean;
  @Input() filesExisting = [];
  @Input() documentTypeId = _Document_Type_Ids.application_document_id;
  @Input() isRequired: boolean;
  @Input() acceptFiles: string = "*";
  filesFromParent = [];
  progress = [];
  uploading = false;
  uploadSuccessful = false;
  @Output() filestoParent = new EventEmitter<any>();
  fileDatas = [];
  fileList = [];
  disableUpload: boolean;
  constructor(
    public uploadService: FileUploadService,
    private myfacilityService: MyFacilityService,
    private httpOptionService: HttpoptionsService
  ) {}

  ngOnInit() {
    this.filesFromParent = [...this.filesExisting];
  }

  addFiles() {
    this.file.nativeElement.files = null;
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files = this.file.nativeElement.files; 
    if (this.isMultiple) {
      for (let key in files) {
        if (!isNaN(parseInt(key))) {
          if (files[key].size < _Max_File_Size) {
            let data: FileMetaDatas = new FileMetaDatas();
            data.fileName = files[key].name;
            data.documentTypeId = this.documentTypeId;
            this.fileList.push(files[key]);
            this.progress.push(0);
            this.fileDatas.push(data);
          } else {
            alert(
              files[key].name +
                " is larger than 10 Mb. Please try uploading file with smaller size"
            );
          }
        }
      }
    } else {
      if (files.length != 0) {
        this.filesFromParent = [];
        if (files[0].size < _Max_File_Size) {
          let data: FileMetaDatas = new FileMetaDatas();
          data.fileName = files[0].name;
          data.documentTypeId = this.documentTypeId;
          this.fileList[0] = files[0];
          this.progress[0] = 0;
          this.fileDatas[0] = data;
        } else {
          alert(
            files[0].name +
              " is larger than 10 Mb. Please try uploading file with smaller size"
          );
        }
      }
    }
    this.checkAndEmit();
  }
  downloadExistingFile(index) {
    let selectedFile = this.filesFromParent[index];
    this.getFileDownloadUrl(selectedFile.fileId);
  }
  removeFile(index) {
    this.fileList.splice(index, 1);
    this.progress.splice(index, 1);
    this.fileDatas.splice(index, 1);
    this.checkAndEmit();
  }

  removeExistingFile(index) {
    this.filesFromParent.splice(index, 1);
    this.checkAndEmit();
  }
  getFileUploadUrl(index) {
    const selectedFile = this.fileList[index];
    const body = {
      fileName: selectedFile.name
    };
    this.myfacilityService.getFileUploadUrl(body).subscribe(
      response => {
        this.fileDatas[index].fileId = response.id;
        let fileUploadUrl = response.uploadUrl;
        this.uploadFileToBucket(fileUploadUrl, selectedFile, index);
      },
      error => {this.httpOptionService.handleError(error)}
    );
  }

  uploadFileToBucket(fileUploadUrl, file, index) {
    this.uploading = true;
    this.uploadService.upload(file, fileUploadUrl)
    .subscribe(progress => {
      this.progress[index] = progress;
      if (progress == 100) {
        this.checkAndEmit();
      }
    },(error)=>{
      this.httpOptionService.handleError(error) 
    });
  }

  getFileDownloadUrl(fileId) {
    this.myfacilityService.getFileDownloadUrl(fileId).subscribe(
      response => {
        let opened = window.open(response.downloadUrl);
        if (!opened) {
          alert("Please allow pop-ups for this Website");
        }
      },
      error => {this.httpOptionService.handleError(error)}
    );
  }

  onFilesClear() {
    this.fileList = [];
    this.fileDatas = [];
    this.filesFromParent = [];
    this.progress = [];
    this.checkAndEmit();
  }

  checkAndEmit() {
    let completed = this.progress.every(element => {
      return element == 100;
    });
    if (completed) {
      this.filestoParent.emit([...this.fileDatas, ...this.filesFromParent]);
    } else {
      this.filestoParent.emit([]);
    }
  }
}
