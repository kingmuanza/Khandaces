import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecouvrirVideosPage } from './decouvrir-videos.page';

describe('DecouvrirVideosPage', () => {
  let component: DecouvrirVideosPage;
  let fixture: ComponentFixture<DecouvrirVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecouvrirVideosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecouvrirVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
