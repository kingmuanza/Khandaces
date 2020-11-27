import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonprofilCreationPage } from './monprofil-creation.page';

describe('MonprofilCreationPage', () => {
  let component: MonprofilCreationPage;
  let fixture: ComponentFixture<MonprofilCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonprofilCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonprofilCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
