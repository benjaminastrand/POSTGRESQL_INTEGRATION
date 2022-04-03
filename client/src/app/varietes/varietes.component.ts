import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Variete } from '../../../../common/tables/Variete';
import { CommunicationService } from '../communication.service';
import { AddVarieteComponent } from './add-variete.component';
import { ModifyVarieteComponent } from './modify-variete.component';

@Component({
  selector: 'app-varietes',
  templateUrl: './varietes.component.html',
  styleUrls: ['./varietes.component.css', '../jardins/jardins.component.css']
})
export class VarietesComponent implements OnInit {
  varietes: Variete[];
  displayedColumns: string[] = ['nom', 'anneemiseenmarche', 'periodemiseenplace', 'perioderecolte', 'descriptionplantation', 'descriptionentretien', 'descriptionrecolte', 'commentairegeneral', 'actions'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit() {
    this.getAllVarietes();
  }

  openModifyDialog(variete: Variete) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    dialogConfig.data = {
      variete
    };
    this.dialog.open(ModifyVarieteComponent, dialogConfig);
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    this.dialog.open(AddVarieteComponent, dialogConfig);
  }

  splitDescription(descriptions: string, index: number) {
    return descriptions.replace('("', '').replace('")', '').split('","')[index];
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
    });
  }
}
