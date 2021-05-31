import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChildExamsPage } from './child-exams.page';

describe('ChildExamsPage', () => {
  let component: ChildExamsPage;
  let fixture: ComponentFixture<ChildExamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildExamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildExamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
