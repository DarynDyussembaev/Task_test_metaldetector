import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetalDetector } from "../../model/MetalDetector";

@Component({
  selector: 'app-metal-detector-form-dialog',
  templateUrl: './metal-detector-form-dialog.component.html',
  styleUrls: ['./metal-detector-form-dialog.component.scss']
})
export class MetalDetectorFormDialogComponent {
  metalDetectorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MetalDetectorFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { detector: MetalDetector, types: any[], countries: any[], availabilities: any[] }
  ) {
    this.metalDetectorForm = this.fb.group({
      brand: [data.detector?.brand || '', Validators.required],
      count: [data.detector?.count || 0, Validators.required],
      yearIssue: [data.detector?.yearIssue || '', Validators.required],
      typeMetalDetectorsId: [data.detector?.typeMetalDetectorsId || null, Validators.required],
      countryManufactureId: [data.detector?.countryManufactureId || null, Validators.required],
      availabilityId: [data.detector?.availabilityId || null, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.metalDetectorForm.valid) {
      this.dialogRef.close(this.metalDetectorForm.value);
    }
  }
}
