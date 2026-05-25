import {ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  MPageService,
  MpageLogComponent,
  AddressService,
  AllergyService,
  CodeValueService,
  ConfigService,
  CustomService,
  DiagnosisService,
  EncounterService,
  Dialog,
  OrganizationService, PersonService, PhoneService, ProblemService, ReferenceService, PrsnlService, MPageLogService
} from '@clinicaloffice/mpage-developer';

declare const VERSION: string;

@Component({
  selector: 'app-root',
  imports: [MpageLogComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['../styles.scss', '../clinical-office-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [MPageService, MPageLogService, AddressService, AllergyService, CodeValueService, ConfigService, CustomService,
    DiagnosisService, EncounterService, Dialog, OrganizationService, PersonService, PhoneService,
    ProblemService, PrsnlService, ReferenceService]
})
export class App implements OnInit {
  public activatedRoute = inject(ActivatedRoute);
  public MPage = inject(MPageService);

  public title: InputSignal<string> = input('default');
  public path: InputSignal<string> = input('path');
  public person_id: InputSignal<number> = input(-1);
  public encntr_id: InputSignal<number> = input(-1);
  public prsnl_id: InputSignal<number> = input(-1);

  ngOnInit() {
    // Collect any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.MPage.personId = params['personId'] ? parseInt(params['personId']) : this.person_id() !== -1 ? this.person_id() : this.MPage.personId;
      this.MPage.encntrId = params['encounterId'] ? parseInt(params['encounterId']) : this.encntr_id() !== -1 ? this.encntr_id() : this.MPage.encntrId;
      this.MPage.prsnlId = params['userId'] ? parseInt(params['userId']) : this.prsnl_id() !== -1 ? this.prsnl_id() : this.MPage.prsnlId;
    });

    this.MPage.setMaxInstances(2, true, 'CHART', false);

  }

}
