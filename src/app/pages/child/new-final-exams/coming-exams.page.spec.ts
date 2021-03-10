import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComingExamsPage } from './coming-exams.page';

describe('ComingExamsPage', () => {
  let component: ComingExamsPage;
  let fixture: ComponentFixture<ComingExamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComingExamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComingExamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
