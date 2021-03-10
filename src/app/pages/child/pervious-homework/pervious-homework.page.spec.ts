import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerviousHomeworkPage } from './pervious-homework.page';

describe('PerviousHomeworkPage', () => {
  let component: PerviousHomeworkPage;
  let fixture: ComponentFixture<PerviousHomeworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerviousHomeworkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerviousHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
