import { Component, Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Injectable()

@Component({
  selector: 'join-dialog',
  templateUrl: './dialog.html',
})

export class DialogService {

  constructor(public dialogRef: MdDialogRef<DialogService>) { }

}
