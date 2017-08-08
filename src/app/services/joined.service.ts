import { MdDialog, MdDialogRef } from '@angular/material';
import { Injectable, Component } from '@angular/core';

@Injectable()
@Component({
  selector: 'joined-dialog',
  templateUrl: './joined.html',
})
export class JoinedService {

constructor(public dialogRef: MdDialogRef<JoinedService>) { }

}
