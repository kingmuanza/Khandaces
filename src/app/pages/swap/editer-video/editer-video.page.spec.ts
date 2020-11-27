import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditerVideoPage } from './editer-video.page';

describe('EditerVideoPage', () => {
  let component: EditerVideoPage;
  let fixture: ComponentFixture<EditerVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditerVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
