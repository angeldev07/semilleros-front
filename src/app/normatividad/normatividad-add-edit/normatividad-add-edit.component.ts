import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-normatividad-add-edit',
  templateUrl: './normatividad-add-edit.component.html',
  styleUrls: ['./normatividad-add-edit.component.css']
})
export class NormatividadAddEditComponent implements OnInit {
  normatividadForm: FormGroup;
  isEdit: boolean = false;  // Default is add mode

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.normatividadForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Check if there's an ID passed in route params (meaning edit mode)
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        // Load the normatividad details into the form
        // Example: this.loadNormatividadDetails(params['id']);
      }
    });
  }

  submitForm(): void {
    if (this.isEdit) {
      // Call service to update normatividad
    } else {
      // Call service to add new normatividad
    }
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
