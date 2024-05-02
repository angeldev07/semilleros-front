
import { JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DropdownModule } from 'primeng/dropdown';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    EditorModule,
    DropdownModule,
    NgClass,
    JsonPipe
  ],
  template: `
  
  <form [formGroup]="form" class="formgrid grid">
    
  <div class="field col-12  md:col-6 p-fluid">
      <label for=""> Titulo *</label>
      <input type="text" formControlName="title" pInputText placeholder="exposicion de ciberseguridad" />
    </div>

    <div class="field col-12 md:col-6  p-fluid">
      <label for=""> Tag * </label>
      <p-dropdown formControlName="tag" [options]="['Noticia']" placeholder="Seleccione una etiqueta"></p-dropdown>
    </div>

    <div class="field col-12 ">
      <div class="mb-3">
        <p-button label="Agregar imagen" icon="pi pi-upload" iconPos="right" (onClick)=" media.click() " ></p-button>
        <input type="file" #media class="hidden" (input)="selectImg($event)" accept="image/*" />
      </div>
      <!-- contenedor para ver las imagenes que se van seleccionando  -->
      <div class="border border-dashed h-15rem border-round flex align-items-center justify-content-center ">
        @if (!mediaContent) {
          <p class="text-center">No hay imagenes seleccionadas</p>
        }
        @if (mediaContent) {
          <img [src]="createImg(mediaContent )" alt="media" class="w-10rem h-10rem" />
        }
      </div>
    </div>
  </form>
  <div class="field col-12 p-fluid" >
        <h2 class="mb-3">Contenido *</h2>
        <p-editor [style]="{ height: '320px' }" (onTextChange)="change($event)"></p-editor>
  </div>
  <div class="my-4 flex justify-content-end pr-3">
    <p-button label="Enviar" icon="pi pi-send" iconPos="right" (onClick)="show()" [disabled]="form.invalid" ></p-button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogFormComponent implements OnInit{


  form = this.fb.group({
    title: ['',[Validators.required]],
    media: [''],
    tag: ['', [Validators.required]]
  });

  content: any = []

  private textChangeSubject = new Subject<string>();
  textChangeSubject$ = new Subscription();


  mediaContent: File | null | undefined;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router){ }

  ngOnInit(): void {

    this.textChangeSubject$ = this.textChangeSubject.pipe(
      debounceTime(600), // ajusta el tiempo de debounce según tus necesidades
      distinctUntilChanged()
    ).subscribe((event:any) => {
      // Aquí pones la lógica que quieres ejecutar después del debounce
      this.content = []
      const res = event.htmlValue.split('<h1>').join('~').split('</h1>').join('~').split('~')

      for (let i = 1; i < res.length; ) {
      
        this.content.push({
          title: res[i],
          content: res[i+1]
        })
        i+=2
      }

      localStorage.setItem('content',JSON.stringify(this.content))

    });
  }

  show(){
    if(this.form.invalid){
      alert('Rellene todos los espacios con *')
    }

    const { title, media, tag} = this.form.value

    const data = {
      
      titulo: title,
      imagenEncabezado: media,
      tag,
      encabezados: this.content.map((item:any) => item.title ).join('~'),
      contenido: this.content.map((item:any) => item.content ).join('~')

    }

    this.postService.crearPost(data).subscribe({
      next: (res) => {
        if (res != null )
          this.router.navigate(['admin/publicaciones'])
        else 
          alert('Ha ocurrido un error inesperado. Intente de nuevo.')
      }
    })
    
    
  }

  change(event: any){    
    this.textChangeSubject.next(event);
  }

  selectImg(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.mediaContent = file
      const reader = new FileReader();
      reader.onload = () => {
          const base64String = reader.result as string;
          this.form.get('media')?.setValue(base64String)
      };

      reader.readAsDataURL(file);
    }
  } 

  createImg(media: File){
    return URL.createObjectURL(media)
  }

}
