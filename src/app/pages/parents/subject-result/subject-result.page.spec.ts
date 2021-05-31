import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectResultPage } from './subject-result.page';

describe('SubjectResultPage', () => {
  let component: SubjectResultPage;
  let fixture: ComponentFixture<SubjectResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
