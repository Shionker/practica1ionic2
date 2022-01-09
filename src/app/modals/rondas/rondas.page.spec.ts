import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RondasPage } from './rondas.page';

describe('RondasPage', () => {
  let component: RondasPage;
  let fixture: ComponentFixture<RondasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RondasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RondasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
