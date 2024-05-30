import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosSemilleroComponent } from './proyectos-semillero.component';

describe('ProyectosSemilleroComponent', () => {
  let component: ProyectosSemilleroComponent;
  let fixture: ComponentFixture<ProyectosSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectosSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
