import {Component, OnInit} from "@angular/core";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MyConfigService} from "../../services/my-config.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'webhook-home-page',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})

export class HomeComponent implements OnInit {
  public generateIcon = faMagicWandSparkles;
  public host: string = environment.apiHost;
  public form: FormGroup;
  private subdomainReg: string = "^([a-zA-Z0-9][a-zA-Z0-9-_])*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$";

  constructor(
    private myConfigService: MyConfigService,
    public router: Router
  ) {}

  ngOnInit() {
    this.initForm()
  }

  public generate(): void {
    const subdomain = this.form.value.subdomain;
    this.myConfigService.setSubdomain(subdomain);
    this.router.navigate(['/dashboard'])
  }

  private initForm(): void {
    this.form = new FormGroup({
      subdomain: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.subdomainReg)
      ])
    })
  }
}
