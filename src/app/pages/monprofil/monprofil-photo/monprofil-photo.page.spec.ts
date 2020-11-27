import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonprofilPhotoPage } from './monprofil-photo.page';

describe('MonprofilPhotoPage', () => {
  let component: MonprofilPhotoPage;
  let fixture: ComponentFixture<MonprofilPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonprofilPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonprofilPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
