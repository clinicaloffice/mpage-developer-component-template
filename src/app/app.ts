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
  styleUrls: ['../styles.scss', '../../node_modules/@clinicaloffice/mpage-developer/styles/clinical-office-styles.scss'],
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
  public person_id: InputSignal<string> = input('');
  public encntr_id: InputSignal<string> = input('');
  public prsnl_id: InputSignal<string> = input('');
  public disable_debugger: InputSignal<string> = input('0');

  ngOnInit() {
    // Collect any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.MPage.personId = params['personId'] ? parseInt(params['personId']) : this.person_id() !== '' ? parseInt(this.person_id()) : this.MPage.personId;
      this.MPage.encntrId = params['encounterId'] ? parseInt(params['encounterId']) : this.encntr_id() !== '' ? parseInt(this.encntr_id()) : this.MPage.encntrId;
      this.MPage.prsnlId = params['userId'] ? parseInt(params['userId']) : this.prsnl_id() !== '' ? parseInt(this.prsnl_id()) : this.MPage.prsnlId;
      this.MPage.disableDebugger = parseInt(this.disable_debugger()) === 1;
    });

    this.MPage.setMaxInstances(2, true, 'CHART', false);

  }

}
