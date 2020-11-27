import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoirVideoPage } from './voir-video.page';

describe('VoirVideoPage', () => {
  let component: VoirVideoPage;
  let fixture: ComponentFixture<VoirVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoirVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
