import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  dialogForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder) {
      this.dialogForm = fb.group({
        'username':['', Validators.required],
        'password':['', Validators.required]
      })
     }

  ngOnInit(): void {
    const formValue = {
      username: this.data.username,
      password: this.data.password
    }

    this.dialogForm.setValue(formValue);
  }

  close(): void {
    this.dialogRef.close();
    }

  logIn(): void {
   this.dialogRef.close(this.dialogForm.value);
  }
}
