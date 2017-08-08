import { Component ,Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Injectable()

@Component({
  selector: 'cancel-order-dialog',
  templateUrl: './cancel-order.html',
})

export class CancelOrderService {

  constructor(public dialogRef: MdDialogRef<CancelOrderService>) { }

}
